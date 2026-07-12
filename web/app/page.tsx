"use client"

import Hero from "./components/Hero";
import Pillars from "./components/Pillars";
import Stats from "./components/Stats";
import TryItDemo from "./components/TryItDemo";

export default function Page()
{
    return(
        <>
            <Hero/>
            <TryItDemo/>
            <Stats/>
            <Pillars/>
        </>
    )
}