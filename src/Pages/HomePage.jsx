import Header from "../components/Header";
import MainSlider from "../components/MainSlider";
import Main from "../components/Main";
import MainImage from "../components/MainImage";
import Offer from "../components/Offer";
import { useQuery } from "@tanstack/react-query";
import { getProductsData } from "../Services/products";

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
      </main>
    </>
  );
}

export default HomePage;
