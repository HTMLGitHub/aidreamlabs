import { getFunctions, httpsCallable } from "firebase/functions";
import {app, auth} from "./firebase";

const functions = getFunctions(app, 'europe-central2');
const BRAND = 'aidreamlab';

// Most backend functions: real Firebase callables. The SDK auto-attaches
// the signed-in user's ID token — no manual header needed.
export function callFunction<T = unknown>(name: string, data: Record<string, unknown> = {})
{
    const fn = httpsCallable<Record<string, unknown>, T>(functions, name);
    return fn({brand: BRAND, ...data});
} 

// A handful of read endpoints expect a plain GET with the token attached
// by hand, instead of the callable protocol.
const FUNCTIONS_BASE_URL = `https://europe-central2-${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.cloudfunctions.net`;

export async function fetchFunction<T = unknown>(path: string, params: Record<string, string> = {})
{
    const url = new URL(`${FUNCTIONS_BASE_URL}${path}`);

    url.searchParams.set('brand', BRAND);
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

    const idToken = await auth.currentUser?.getIdToken();
    const headers: HeadersInit = idToken ? {Authorization: `Bearer ${idToken}` } : {};

    const res = await fetch(url.toString(), {headers});
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
}