import Header from "../components/Header";
import MainSlider from "../components/MainSlider";
import Main from "../components/Main";
import MainImage from "../components/MainImage";
import Offer from "../components/Offer";
import { useQuery } from "@tanstack/react-query";
import { getProductsData } from "../Services/products";
import Obligations from "../components/Obligations";
import Footer from "../components/Footer";

function HomePage() {
  const queryKey = ["products-data"];
  const response = useQuery({
    queryKey,
    queryFn: getProductsData,
  });

  return (
    <>
      <Header />
      <main className="container">
        <MainSlider />
        <Offer response={response} />
        <Main />
        <MainImage />
        <Obligations />
        <Footer />
      </main>
    </>
  );
}

export default HomePage;
