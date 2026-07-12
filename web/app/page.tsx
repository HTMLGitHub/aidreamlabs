"use client"

import ExampleGallery from "./components/ExampleGallery";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import FounderNote from "./components/FounderNote";
import Hero from "./components/Hero";
import Pillars from "./components/Pillars";
import Pricing from "./components/Pricing";
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
            <FounderNote/>
            <ExampleGallery/>
            <Pricing/>
            <FAQ/>
            <FinalCTA/>
            <Footer/>
        </>
    )
}