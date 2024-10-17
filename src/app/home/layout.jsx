"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PostContext } from "../context/PostContext";
import Dropzone from "dropzone";

export default function HomeLayout({ children }) {
  const { userData, setUserdata } = useContext(PostContext);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;

      const res = await axios.post("http://localhost:3000/api/user/logout");

      if (res.data.Status === "Success") {
        router.push("/logs/login");
      } else {
        alert("Error: " + res.data.Error);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while logging out.");
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/user/verifytoken")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Unauthorized");
        }
      })
      .then((data) => {
        if (data?.error) {
          console.error(data.error);
        } else {
          const email = data.email;
          const emp_id = data.emp_id;
          // console.log("User email:", email,"Employee Id:", emp_id);
          setUserdata(data);
        }
      })
      .catch((error) => {
        console.error(error);
        router.push("/logs/login");
      });
  }, []);

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-base-300 p-4 transition-transform duration-300 ease-in-out z-20`}
      >
        <ul className="menu p-4  text-base-content font-semibold text-xl pt-16  h-full ">
          <li className="m-2 	border-solid border-2 shadow-xl bg-base-100">
            <Link href="/home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
              Dashboard
            </Link>
          </li>
          <li className="m-2 	border-solid	border-solid bg-base-100 border-2 shadow-xl">
            <Link href="/home/appointment">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
              Appointment
            </Link>
          </li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Navbar */}
        <div
          className={`navbar shadow-md transition-all duration-300 h-12 ${
            isSidebarOpen ? "pl-64" : "pl-0"
          }`}
        >
          <div className="flex-1">
            {/* Conditionally render hamburger button */}
            {!isSidebarOpen && (
              <button className="btn btn-ghost text-xl" onClick={toggleSidebar}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-full w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            )}
          </div>
          <span className="text-lg font-semibold mr-8">Mayo Clinic</span>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-12 ring ring-error mt-2    rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content shadow-lg bg-base-100 rounded-box z-[10] mt-2  border border-2 border-solid border-error w-52  p-2 shadow"
              >
                <li>
                  <a className="justify-between font-semibold ">
                    {userData.emp_id}
                  </a>
                </li>
                
                <li>
                  <a className="justify-between font-semibold ">
                    {userData.email}
                  </a>
                </li>

                <li className="mt-2 ">
                  <button
                    className="btn btn-error  btn-outline btn-sm mx-8 mt-2 "
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="mt-2 mx-18 sm:ml-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
