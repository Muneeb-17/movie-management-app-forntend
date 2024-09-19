"use client";

import List from "@/components/Movies/List";
import axios from "axios";
import Home from "@/components/Home";
import { useEffect, useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ListPage = () => {
  const Router = useRouter();

  useLayoutEffect(() => {
    const token = window.localStorage.getItem("user_key");
  
    if(!token) {
      Router.push('/login');
    }
  },[])
  
  const [movies, setMovies] = useState<any>([]);
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);

  const fetchMovies = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${window.localStorage.getItem("user_key")}`,
        "Content-Type": "multipart/form-data",
      };
    
      const response = await axios.get(`http://localhost:5001/movies?limit=${limit}&page=${page}`, {
        headers,
      });

     if(response.status === 200) {
       setMovies(response.data);
     }

    } catch (err: any) {
      if(err.status === 401) {
        toast.error("Session Exprired")
        Router.push('/login')
      }
      console.error(err);
    }
  };

  const deleteMovies = async (id: number) => {
    try {
      if (!id) {
        toast.error("Something Went Wrong");
      }

      const headers = {
        Authorization: `Bearer ${window.localStorage.getItem("user_key")}`,
        "Content-Type": "multipart/form-data",
      };

      const response = await axios.delete(
        `http://localhost:5001/movies/${id}`,
        {
          headers,
        }
      );

      if (response.status === 401) {
        toast.error("Unauthorized user!");
        Router.push("/login");
      }

      if (response.status === 200) {
        fetchMovies()
        toast.success("Delete SuccessFully");
      }
    } catch (err: any) {
      if (err.status === 401) {
        toast.error("Unauthorized user!");
        Router.push("/login");
      }
      toast.error("Something Went Wrong!");
      console.error(err);
    }
  };

  const editMoviesDetails = (id: number) => {
    Router.push(`/movie/${id}`);
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  return (
    <>
      {movies.length === 0 ? (
        <h1 className="text-white text-3xl text-center">Loading....</h1>
      ) : movies && movies?.movies?.length > 0 ? (
        <List
          movies={movies}
          deleteMovies={deleteMovies}
          editMoviesDetails={editMoviesDetails}
          setPage={setPage}
        />
      ) : (
        <Home />
      )}
    </>
  );
};

export default ListPage;
