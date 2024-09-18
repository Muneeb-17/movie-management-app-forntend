import CardImg1 from "@/assets/images/card-img-1.svg";
import Image from "next/image";

const Card = ({ movie, deleteMovies, editMoviesDetails }: any) => {
  return (
    <div className="w-[282px] h-[550px] bg-card-color rounded-xl flex items-start justify-center p-2 flex-col max-sm:w-[180px] max-sm:h-[334px]">
      <div className="w-[282px] h-[550px]">
        <Image
          src={movie.poster}
          width={266}
          height={500}
          alt="card-img"
          className="mb-4"
        />
      </div>
      <div className="w-full flex flex-col gap-4 ml-2">
        <p className="text-white font-semibold ">{movie.title}</p>
        <p className="text-white">{movie.publishingYear}</p>
        <div className="w-full flex justify-around">
          <button
            onClick={() => editMoviesDetails(movie._id)}
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Edit
          </button>
          <button
            onClick={() => deleteMovies(movie._id)}
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
