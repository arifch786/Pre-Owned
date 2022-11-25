import React from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

import { MdOutlinePayment } from "react-icons/md";

import {
  AiFillDelete,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Checkout = ({ cart, subTotal, addToCart, removeFromCart, clearCart }) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will  receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and  checkout when you’re ready."
      );
    }
  }, []);
  return (
    <div>
      <div>
        <img
          class="mx-auto h-28 w-auto"
          src="/assets/logo2.png"
          alt="Your Company"
        />
      </div>

      <div className="flex text-3xl justify-center font-semibold mt-3">
        checkout
      </div>
      <form action="/api/checkout_sessions" method="POST">
        <div class="lg:w-1/2 md:w-2/3 p-3 mx-auto">
          <h1 className="p-4 font-medium">1. Delivery Details !</h1>
          <div class="flex flex-wrap -m-2">
            <div class="p-2 w-1/2">
              <div class="relative">
                <label class="leading-7 text-sm text-gray-600">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your Name"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label class="leading-7 text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your Email"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-full">
              <div class="relative">
                <label class="leading-7 text-sm text-gray-600">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label class="leading-7 text-sm text-gray-600">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label class="leading-7 text-sm text-gray-600">city</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label class="leading-7 text-sm text-gray-600">Province</label>
                <input
                  type="province"
                  id="pro"
                  name="pro"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label class="leading-7 text-sm text-gray-600">
                  PIN - Code
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      <h1 className=" lg:w-1/2 md:w-2/3 p-3 mx-auto font-medium">
        2. Review cart item!
      </h1>
      <div className="sidebar   bg-[#f1f5f9] pt-5 pb-5   rounded-sm lg:w-1/2 md:w-2/3 pl-10 pr-10 mx-auto border-gray-300 ">
        <div>
          <ol className="list-decimal ">
            {Object.keys(cart).length == 0 && (
              <div className="text-base font-semibold  text-justify ">
                Your Cart is Empty
              </div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="flex space-x-2 my-5 pt-5  ">
                    <div className="w-2/3 font-medium ">
                      {cart[k].name}({cart[k].size}/{cart[k].variant})
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
                        }}
                        className="mx-1 "
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
        <span className=" font-medium">Total Price: Rs {subTotal}</span>
      </div>
      <div className="lg:w-1/2 md:w-2/3 mx-auto pl-4 pr-4">
        <Link href="">
          <a>
            <button class=" flex mt-3  text-white bg-indigo-500 border-0 p-3  focus:outline-none hover:bg-indigo-600 rounded text-lg">
              <MdOutlinePayment className="m-1 text-2xl" /> Pay Rs: {subTotal}
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
