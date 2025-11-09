import React from "react";
import Category from "./Category";
import Slider from "./Slider";
import NewsSection from "./NewsSection";
import Service from "./Service";

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <NewsSection></NewsSection>
      <Category></Category>
      <Service></Service>
    </div>
  );
};

export default Home;
