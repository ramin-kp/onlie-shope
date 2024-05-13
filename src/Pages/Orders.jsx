import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//components
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import OrderProducts from "../components/OrderProducts";
import StepperBox from "../components/StepperBox";
import CustomerDetails from "../components/CustomerDetails";

//context
import { useCard } from "../context/CardContextProvider";

function Orders() {
  const [state, dispatch] = useCard();
  const [step, setStep] = useState(+localStorage.getItem("step") || 0);
  useEffect(() => {
    localStorage.setItem("step", +step);
  }, [step,setStep]);
  const { itemCounter } = state;
  return (
    <>
      <Header />
      <main
        className="container bg-white dark:bg-dark-100 p-5 my-10 text-zinc-900 dark:text-white rounded-2xl"
        data-aos="fade-up"
      >
        {!!itemCounter ? (
          <>
            {/* Stepper  */}
            <StepperBox step={step} />
            {/* products */}
            {step === 0 && (
              <OrderProducts
                data={state}
                step={step}
                setStep={setStep}
                dispatch={dispatch}
              />
            )}
            {step === 1 && (
              <CustomerDetails
                step={step}
                setStep={setStep}
                data={state}
                dispatch={dispatch}
              />
            )}
          </>
        ) : (
          <div className=" w-full text-center">
            <div className="flex-center gap-x-2">
              <svg className="w-10 h-10 text-primary-200">
                <use href="#x-circle"></use>
              </svg>
              <h3 className="font-danaBold text-2xl">
                محصولی در سبد خرید وجود ندارد
              </h3>
            </div>
            <Link
              to="/products"
              className="inline-block px-3 py-2 my-5 mx-auto bg-primary-200 hover:bg-primary-100 font-dana text-white rounded-lg transition-colors duration-150"
            >
              برگشت به فروشگاه
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Orders;
