import React from "react";
import Category from "./Category";
import Slider from "./Slider";
import NewsSection from "./NewsSection";
import Service from "./Service";
import RecentBills from "./RecentBills";

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <RecentBills></RecentBills>
      <NewsSection></NewsSection>
      <Category></Category>
      <Service></Service>
    </div>
  );
};

export default Home;
