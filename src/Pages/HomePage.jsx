import React, { Fragment } from "react";
import Header from "../components/Header";
import MainSlider from "../components/MainSlider";
import Main from "../components/Main";

function HomePage() {
  return (
    <>
      <Header />
      <main className="container">
        <MainSlider />
        <Main />
      </main>
    </>
  );
}

export default HomePage;
