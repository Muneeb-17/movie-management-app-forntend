"use client";
import AddIcon from "@/assets/icons/Add";
import Logout from "@/assets/icons/Logout";
import Card from "./Card";
import { useState } from "react";
import { useRouter } from "next/navigation";

const List = ({ movies, deleteMovies, editMoviesDetails, setPage }: any) => {
  console.log("movieesss", movies);
  const Router = useRouter();
  const cardsLimit = movies.limit;
  const totalCards = movies.totalMovies;
  const paginationButtons = Math.ceil(totalCards / cardsLimit);
  console.log("Pagination Button", paginationButtons);
  const buttonsArray = Array.from(
    { length: paginationButtons < movies.totalMovies ? paginationButtons : 1 },
    (_, index) => index + 1
  );
  const [active, setIsActive] = useState(1);

  const handleNext = (e: any) => {
    let page = ++movies.page;
    e.preventDefault();
    console.log("next", page, movies.totalPages);
    if (page <= movies.totalPages) {
      console.log("next", page);
      setPage(page);
    }
  };

  const handlePrevious = (e: any) => {
    let page = --movies.page;
    e.preventDefault();
    console.log("next", page, movies.totalPages);
    if (page > 0) {
      setPage(page);
    }
  };

  const handleButtons = (event: React.MouseEvent<HTMLButtonElement>) => {
    const val = event.currentTarget.id;
    console.log("val", val);
  };

  const addMovies = () => {
    Router.push("/movie/add");
  };

  const logout = () => {
    localStorage.removeItem('user_key');
    Router.push('/login');
  }

  return (
    <>
      <div className="flex flex-col gap-24 min-h-[100vh]">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="text-[48px] font-semibold text-white max-sm:text-[32px]">
              My movies
            </h2>
            <div onClick={addMovies}>
              <AddIcon />
            </div>
          </div>
          <div onClick={() => logout()} className="flex gap-2 items-center">
            <p className="text-base font-bold text-white max-sm:hidden">
              Logout
            </p>
            <Logout />
          </div>
        </div>

        <div className="flex gap-[17px] flex-wrap justify-around max-[700px]:justify-center">
          {movies &&
            movies.movies?.map((movie: any) => {
              console.log("movie---", movies);
              return (
                <Card
                  key={movie.id}
                  movie={movie}
                  deleteMovies={deleteMovies}
                  editMoviesDetails={editMoviesDetails}
                />
              );
            })}
        </div>
        <div className="flex justify-center gap-2 items-center">
          <button
            onClick={(e) => handlePrevious(e)}
            disabled={movies.totalPages > movies.page}
            className="disabled:opacity-45 text-[16px] text-white font-bold hover:text-login-button-green cursor-pointer mr-3"
          >
            Prev
          </button>
          {buttonsArray.map((button: number, index: number) => {
            return (
              <button
                id={`${button}`}
                onClick={handleButtons}
                className={`disabled:opacity-45 flex justify-center items-center text-white w-[32px] h-[32px] font-bold text-[16px]  rounded-[4px] ${
                  active ? "bg-login-button-green" : "bg-card-color"
                }`}
              >
                {button}
              </button>
            );
          })}
          <button
            onClick={(e) => handleNext(e)}
            disabled={movies.totalPages <= movies.page}
            className="disabled:opacity-45 text-[16px] text-white font-bold hover:text-login-button-green cursor-pointer ml-3"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default List;
