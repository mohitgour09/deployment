"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, password };

    axios.defaults.withCredentials = true;

    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/login",
        data
      );

      if (res.data.Status === "Success") {
        // Redirect to dashboard or home page after successful login
        router.push("/home");
      } else {
        alert("Error: " + res.data.Error);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while logging in.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage:
          "url(https://cdn.pixabay.com/photo/2017/12/10/14/47/medical-3010750_1280.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // backgroundPosition: "",
      }}
    >
      <h1
        className="absolute top-0 left-4 m-4 text-xl font-bold text-white"
        style={{ zIndex: 10 }}
      >
        <Image src="/mayo.jpg" height={200} width={200} alt="img" />
      </h1>

      <div
        className="w-full max-w-md p-8 space-y-8 bg-base-300 rounded-lg shadow-xl"
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2018/02/01/21/19/interior-3122427_1280.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      >
        <div className="flex justify-center">
          <Image src="/img2.png" height={100} width={100} alt="img" />
        </div>

        <h2 className="text-3xl font-bold text-center text-indigo-600">
          Doctor Login
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              className="block w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 btn btn-primary text-semibold text-lg"
          >
            LOGIN
          </button>
        </form>

        <Link
          href={"./register"}
          className="flex justify-center link link-primary mt-2 text-sm font-semibold"
        >
          {`Don't Have An Account? Register`}
        </Link>
      </div>
    </div>
  );
};

export default Login;
