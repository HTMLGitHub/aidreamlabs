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
import {callFunction, fetchFunction} from "../lib/functions";

export default function Page()
{
    const [user, setUser] = useState<User | null>(null);

    useEffect(() =>
    {
        return onAuthStateChanged(auth, (u) => setUser(u));
    }, []);

    const handleSignIn = () => signInWithPopup(auth, new GoogleAuthProvider());
    const handleSignOut = () => signOut(auth);

    const getUUID = async () => 
      {
        const result = await callFunction("getUuid", {isProduction: false, chatMode: "test"});
        console.log("getUuid result:", result);
      }

    const getSections = async() =>
      {
        const result = await fetchFunction("/getsections", {});
        console.log("getSections result:", result);
      } 

    return(
        <div>
            {
                user ?
                (
                    <>
                        <p>Signed in as {user.email}</p>

                        <div>
                          <button onClick={getUUID}>Get UUID</button>
                        </div>

                        <div>
                          <button onClick={getSections}>Sections</button>
                        </div>

                        <div>
                          <button onClick={handleSignOut}>Sign Out</button>
                        </div>                        
                    </>
                ) :
                (
                    <button onClick={handleSignIn}>Sign In With Google</button>
                )
            }
        </div>
    )
}