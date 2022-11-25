import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import {
  AiFillDelete,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { useRef } from "react";

const Navbar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const togglecart = () => {
    if (ref.current.classNameList.contains("translate-x-full")) {
      ref.current.classNameList.remove("translate-x-full");
      ref.current.classNameList.add("translate-x-0");
    } else if (!ref.current.classNameList.contains("translate-x-full")) {
      ref.current.classNameList.remove("translate-x-0");
      ref.current.classNameList.add("translate-x-full");
    }
  };

  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };
  const ref = useRef();
  return (
    <div className="sticky top-0 z-50 bg-white">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="shadow-md relative">
        <header className="text-gray-600 body-font ">
          <div className="container  mx-auto flex flex-wrap pb-1 pt-1 pl-7 pr-7 flex-col md:flex-row items-center ">
            <Link href="/">
              <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 ">
                <Image
                  src="/assets/logo2.png"
                  alt=""
                  width="80"
                  height="80"
                ></Image>
              </a>
            </Link>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-lg font-semibold justify-center">
              <Link href="/Home">
                <a className="mr-5 hover:text-gray-900">Home</a>
              </Link>
              <Link href="/Hoodies">
                <a className="mr-5 hover:text-gray-900">Hoodies</a>
              </Link>
              <Link href="/Mugs">
                <a className="mr-5 hover:text-gray-900">Mugs</a>
              </Link>
              <Link href="/Tshirt">
                <a className="mr-5 hover:text-gray-900">Tshirts</a>
              </Link>
            </nav>
            <div className="flex">
              <button className="  inline-flex items-center cursor-pointer bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mx-5">
                <FaShoppingCart onClick={togglecart} className=" text-2xl" />
              </button>
              {!user.value && (
                <Link href="/Login">
                  <button className="inline-flex font-bold items-center cursor-pointer bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mx-5">
                    Login
                  </button>
                </Link>
              )}

              {dropdown && (
                <div className="absolute md:inline top-44   md:top-16  z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                  <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                    <div>{user.name}</div>
                    <div className="font-medium truncate">{user.email}</div>
                  </div>
                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <Link href="/myaccount">
                        <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          My Account
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/orders">
                        <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Orders
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Earnings
                        </a>
                      </Link>
                    </li>
                  </ul>
                  <div className="py-1">
                    <div
                      onClick={logout}
                      className="block py-2 px-4 text-sm text-gray-700 font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Logout
                    </div>
                  </div>
                </div>
              )}
              {user.value && (
                <button className="  inline-flex items-center cursor-pointer bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mx-5">
                  <MdAccountCircle
                    onClick={toggleDropdown}
                    className=" text-2xl"
                  />
                </button>
              )}
            </div>
          </div>
        </header>
      </div>
      <div
        ref={ref}
        className={`sidebar overflow-auto w-[300px]  h=[100vh] md:w-96 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600   absolute right-0 top-0 px-8  py-20  z-10   transform transition-transform ${
          Object.keys(cart).length !== 0 ? " translate-x-0" : "translate-x-full"
        }`}
      >
        <h1 className="font-bold text-xl">shopping cart</h1>
        <span
          onClick={togglecart}
          className=" cursor-pointer absolute top-5 right-2"
        >
          <AiFillCloseCircle />
        </span>
        <div>
          <ol className="list-decimal">
            {Object.keys(cart).length == 0 && (
              <div className="text-base font-semibold text-justify mt-3">
                Your Cart is Empty
              </div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="flex space-x-2 my-12   ">
                    <div className="w-2/3 font-medium ">
                      {cart[k].name} ({cart[k].size}/{cart[k].variant})
                    </div>
                    <div className="flex w-1/3  justify-center text-lg items-center font-normal">
                      <AiFillMinusCircle
                        onClick={() => {
                          removeFromCart(
                            k,
                            1,
                            cart[k].name,
                            cart[k].price,
                            cart[k].size,
                            cart[k].variant
                          );
                          toast.error(
                            "you successfully remove item from cart",
                            {
                              position: "top-center",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            }
                          );
                        }}
                        className="mx-1  "
                      />
                      <div className=""> {cart[k].qty}</div>
                      <AiFillPlusCircle
                        onClick={() => {
                          addToCart(
                            k,
                            1,
                            cart[k].name,
                            cart[k].price,
                            cart[k].size,
                            cart[k].variant
                          );
                          toast.success(
                            "Congratulations! you add item in cart",
                            {
                              position: "top-center",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            }
                          );
                        }}
                        className="mx-1 "
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <span className="font-semibold">Total Price : Rs {subTotal}</span>
          <div className="flex space-x-1 ">
            <Link href="/Checkout">
              <a>
                <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 p-2   focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  <BsFillBagCheckFill className="m-1" /> Checkout
                </button>
              </a>
            </Link>
            <button
              onClick={clearCart}
              className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 p-2 pl-6 pr-6  focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              <AiFillDelete className="m-1" /> Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
