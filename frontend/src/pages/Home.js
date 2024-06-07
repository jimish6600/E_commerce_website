import React from "react";
import CategoryLisy from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryLisy />
      <BannerProduct />
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
      <VerticalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
    </div>
  );
};

export default Home;
