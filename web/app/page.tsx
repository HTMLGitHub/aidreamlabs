"use client"

import { useEffect, useState } from "react";
import 
{
     signInWithPopup, 
     GoogleAuthProvider,
     onAuthStateChanged,
     signOut,
     User,
} from "firebase/auth";
import {auth} from "../lib/firebase";

export default function Page()
{
    const [user, setUser] = useState<User | null>(null);

    useEffect(()=>
    {
        return onAuthStateChanged(auth, (u) => setUser(u));
    });

    const handleSignIn = () => signInWithPopup(auth, new GoogleAuthProvider());
    const handleSignOut = () => signOut(auth);

    return(
        <div>
            {
                user ?
                (
                    <>
                        <p>Signed in as {user.email}</p>
                        <button onClick={handleSignOut}>Sign Out</button>
                    </>
                ) :
                (
                    <button onClick={handleSignIn}>Sign In With Google</button>
                )
            }
        </div>
    )
}