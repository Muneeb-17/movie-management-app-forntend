"use client";

import DynamicForm from "@/components/Movies/DynamicForm";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";

const MovieForm = ({ params }: { params: { id: string } }) => {
  const Router = useRouter();

  useLayoutEffect(() => {
    const token = window.localStorage.getItem("user_key");

    if (!token) {
      Router.push("/login");
    }
  }, []);

  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    publishingYear: "",
  });
  const [id, setId] = useState<any>(null);

  useEffect(() => {
    setId(params.id);
    editMoviesDetails(params.id);
  }, []);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const editMoviesDetails = async (id: string) => {
    try {
      if (!id) {
        toast.error("Something Went Wrong");
      }

      const headers = {
        Authorization: `Bearer ${window.localStorage.getItem("user_key")}`,
        "Content-Type": "multipart/form-data",
      };

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/${id}`, {
        headers,
      });

      if (response.status === 401) {
        toast.error("Unauthorized User");
        Router.push("/login");
        return;
      }
      if (response.status === 200) {
        const {
          data: {
            movie: { title, publishingYear },
          },
        } = response;

        setFormData({ title: title, publishingYear: publishingYear });
      }
    } catch (err: any) {
      if (err.status === 401) {
        toast.error("Unauthorized User");
        Router.push("/login");
        return;
      }
      toast.error("Something Went Wrong!");
      console.error(err);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("poster", file);
    formPayload.append("title", formData.title);
    formPayload.append("publishingYear", formData.publishingYear);

    const headers = {
      Authorization: `Bearer ${window.localStorage.getItem("user_key")}`,
      "Content-Type": "multipart/form-data",
    };

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/${id}`,
        formPayload,
        { headers }
      );

      if (response.status === 200) {
        toast.success("Data Updated Successfully");
        Router.push("/movie/list");
      }

      if (response.status === 401) {
        toast.error("Unauthorized User");
        Router.push("/login");
      }

      setFile(null);
      setFormData({ title: "", publishingYear: "" });
    } catch (error: any) {
      if (error.status === 401) {
        toast.error("Unauthorized User");
        Router.push("/login");
        return;
      }
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  return (
    <DynamicForm
      title="Edit Movie Details"
      formData={formData}
      editMoviesDetails={editMoviesDetails}
      handleInputChange={handleInputChange}
      handleFileChange={handleFileChange}
      handleSubmit={handleUpdate}
    />
  );
};

export default MovieForm;
