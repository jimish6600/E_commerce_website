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
      <HorizontalCardProduct category={"speakers"} heading={"Top's Speakers"} />
      <VerticalCardProduct category={"televisions"} heading={"Top's Televisions"} />
      <VerticalCardProduct category={"mobiles"} heading={"Top's Mobiles"} />
    </div>
  );
};

export default Home;
