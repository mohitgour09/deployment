"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main
        className="flex min-h-screen flex-col  items-center justify-between p-0"
        style={{
          backgroundImage: "url(/bgimg.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center ",
        }}
      >
        <div className="navbar bg-base-100 z-10 opacity-50 shadow shadow-lg">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>{/* <a>Item 1</a> */}</li>
                {/* <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li> */}
                <li>{/* <a>Item 3</a> */}</li>
              </ul>
            </div>
            <a className="btn z-50   text-xl ">
              Mayo Clinic
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>{/* <a>Item 1</a> */}</li>
              {/* <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li> */}
              <li>{/* <a>Item 3</a> */}</li>
            </ul>
          </div>
          <div className="navbar-end">
            <Link
              href={"../logs/login"}
              className="flex justify-center no-underline link link-primary mt-0 text-sm font-semibold"
            >
              <button className="z-50 px-10 btn  text-semibold text-xl btn-outline bg-white font-white ">
                Login
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
