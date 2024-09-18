"use client";

import DynamicForm from "@/components/Movies/DynamicForm";
import { useLayoutEffect, useState } from "react";
import axios from "axios";
import aws from "aws-sdk";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



const MovieForm = () => {
  const Router = useRouter();

  useLayoutEffect(() => {
    const token = window.localStorage.getItem("user_key");
  
    if(!token) {
      Router.push('/login');
    }
  },[])

  const [file, setFile] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    publishingYear: "",
  });


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log({ name }, { value });

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const response = await axios.post(
        "http://localhost:5001/movies/",
        formPayload,
        { headers }
      );
      
      if(response.status === 201) {
        toast.success("Data uploaded successfully");
        Router.push('/movie/list')
      }

      setFile(null);
      setFormData({ title: "", publishingYear: "" });
    } catch (error: any) {
      console.log('error', error);
      
      if(error.status === 401) {
        toast.error('Session Expired');
        Router.push("/login");
      }
    }
  };

  return (
    <DynamicForm
      title="Create a new movie"
      handleInputChange={handleInputChange}
      handleFileChange={handleFileChange}
      handleSubmit={handleSubmit}
      formData={formData}
    />
  )
};

export default MovieForm;
