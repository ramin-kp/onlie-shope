import React, { Fragment } from "react";
import Header from "../components/Header";
import MainSlider from "../components/MainSlider";
import Main from "../components/Main";
import MainImage from "../components/MainImage";

function HomePage() {
  return (
    <>
      <Header />
      <main className="container">
        <MainSlider />
        <Main />
        <MainImage />
      </main>
    </>
  );
}

export default HomePage;
