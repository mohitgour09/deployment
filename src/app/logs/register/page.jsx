"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const RegistrationForm = () => {
  const [emp_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const postAdmin = async () => {
    let data = {
      emp_name,
      email,
      password,
    };
    try {
      const response = await fetch("http://localhost:3000/api/user/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage("Registration successful!");
        setTimeout(() => {
          router.push("./login");
        }, 2000); // Redirect to login after 2 seconds
      } else {
        setMessage(result.Error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error registering admin:", error);
      setMessage("Error: Unable to register.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postAdmin();
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1551601651-25f9b9baf602?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <h1
        className="absolute top-0 left-4 m-4 text-xl font-bold text-white"
        style={{ zIndex: 10 }}
      >
        <Image src="/mayo.jpg" height={200} width={200} alt="img" />
      </h1>
      <div className="w-full max-w-md p-10 space-y-8 bg-base-300 rounded-lg shadow-lg">
        <div className="flex justify-center">
          <Image src="/img2.png" height={100} width={100} alt="img" />
        </div>
        <h2 className="text-4xl font-bold text-center text-indigo-700">
          Doctor Sign Up
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-800"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={emp_name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800"
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
          <div className="flex flex-col items-center space-y-4">
            <button
              type="submit"
              className="w-full px-4 py-2 btn btn-primary text-semibold text-lg"
            >
              Sign up
            </button>
            <Link
              href={"./login"}
              className="flex justify-center link link-primary mt-2 text-sm font-semibold"
            >
              {`Already have an account? Log in`}
            </Link>
          </div>
        </form>
        {message && (
          <div className="mt-2 ml-4 text-center text-red-500">{message}</div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;



