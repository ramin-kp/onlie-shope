import React from "react";
import Header from "../components/Header";
import MainSlider from "../components/MainSlider";

function HomePage() {
  return (
    <>
      <Header />
      <main className="container">
        <MainSlider />
      </main>
    </>
  );
}

export default HomePage;
