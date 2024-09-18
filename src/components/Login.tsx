"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { FormEventHandler, useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    console.log({ email });
    console.log({ password });

    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5001/login", {
        email,
        password,
      });
    
      if(response.status === 200) {
        console.log('response', response);
        toast.success('Siging In...')
        window.localStorage.setItem('user_key', response.data.token);
        router.push("/movie/list");
      }
    } catch (err: any) {
      console.log("err", err);
      toast.error(err.response.data.msg || 'Something went wrong!');
    }
  };

  return (
    <div className="w-full ">
      <div className="h-custom-calc flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
        <h1 className="text-[64px] font-semibold leading-[80px] text-center text-white p-10 max-sm:text-[48px]">
          Sign in
        </h1>

        <form
          className="space-y-6 w-full flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="mt-2 w-full flex justify-center">
            <input
              type="email"
              id="input-email-label"
              className="placeholder-white py-3 px-4 block  rounded-lg bg-input-green text-sm  text-white outline-0 border-0 w-[300px] h-[44px] max-sm:w-full max-sm:max-w-[380px]"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-2 w-full flex justify-center">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              className="placeholder-white py-3 px-4 block rounded-lg bg-input-green text-sm  text-white outline-0 border-0 w-[300px] h-[44px] max-sm:w-full max-sm:max-w-[380px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="flex items-center gap-[7px]">
              <input type="checkbox" className="hidden peer" />
              <div className="w-[18px] h-[17px] bg-input-green peer-checked:bg-red-500 rounded-[5px]"></div>
              <span className="text-white font-normal text-sm">
                Remember me
              </span>
            </label>
          </div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-[300px] h-[54px] text-white rounded-lg bg-login-button-green font-bold max-sm:w-full max-sm:max-w-[380px]"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
