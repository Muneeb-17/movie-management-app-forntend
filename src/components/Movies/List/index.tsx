"use client";
import AddIcon from "@/assets/icons/Add";
import Logout from "@/assets/icons/Logout";
import Card from "./Card";
import { useState } from "react";

const List = () => {
  const cardsLimit = 8;
  const totalCards = 16;
  const paginationButtons = totalCards / cardsLimit;
  const buttonsArray = Array.from(
    { length: paginationButtons },
    (_, index) => index + 1
  );
  const [active, setIsActive] = useState(1);

  const handleNext = () => {
    if (active === paginationButtons) {
      return;
    }
    setIsActive((pre) => pre + 1);
  };

  const handlePrevious = () => {
    if (active === 1) {
      return;
    }
    setIsActive((pre) => pre - 1);
  };

  const handleButtons = (event: React.MouseEvent<HTMLButtonElement>) => {
    const val = event.currentTarget.id;
    setIsActive(Number(val));
  };

  return (
    <div className="flex flex-col gap-24 min-h-[100vh]">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-[48px] font-semibold text-white max-sm:text-[32px]">
            My movies
          </h2>
          <AddIcon />
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-base font-bold text-white max-sm:hidden">Logout</p>
          <Logout />
        </div>
      </div>

      <div className="flex gap-[17px] flex-wrap justify-between max-[700px]:justify-center">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="flex justify-center gap-2 items-center">
        <button
          onClick={handlePrevious}
          disabled={active === 1}
          className="disabled:opacity-45 text-[16px] text-white font-bold hover:text-login-button-green cursor-pointer mr-3"
        >
          Prev
        </button>
        {buttonsArray.map((button: number, index: number) => {
          return (
            <button
              id={`${button}`}
              onClick={handleButtons}
              disabled={active === index + 1}
              className={`disabled:opacity-45 flex justify-center items-center text-white w-[32px] h-[32px] font-bold text-[16px]  rounded-[4px] ${
                active === index + 1 ? "bg-login-button-green" : "bg-card-color"
              }`}
            >
              {button}
            </button>
          );
        })}
        <button
          onClick={handleNext}
          disabled={active === paginationButtons}
          className="disabled:opacity-45 text-[16px] text-white font-bold hover:text-login-button-green cursor-pointer ml-3"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default List;
