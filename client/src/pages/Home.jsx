import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeatureProduct from "./FeatureProduct";
import BannerSection from "../components/BannerSection";
import FeaturesSection from "../components/FeaturesSection";

function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeatureProduct/>
      <BannerSection/>
      <FeaturesSection/>
    </div>
  );
}

export default Home;