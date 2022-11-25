import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { parse } from "postcss";
import mongoose from "mongoose";
import Product from "../../Models/Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Slug = ({ buyNow, addToCart, product, variants }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setpin] = useState();
  const [service, setservice] = useState();
  const checkserviceability = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}:3000/api/pincode`);
    let pinjason = await pins.json();
    if (pinjason.includes(parseInt(pin))) {
      setservice(true);
      toast.success("wow! your pin is Serviceable.", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      setservice(false);
      toast.error("opps! your pin is not serviceable", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const onChangePin = (e) => {
    setpin(e.target.value);
  };

  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.size);

  const refreshVariant = (newsize, newcolor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/Product/${variants[newcolor][newsize]["slug"]}`;
    window.location = url;
  };

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <ToastContainer
          position="bottom-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <div className="container px-5 py-16 mx-auto">
          <div className="lg:w-4/6 xl:w-5/6 md:w-3/4 w-full   mx-auto flex justify-center flex-wrap">
            <img
              alt="ecommerce"
              className="  mb-12   object-cover object-top rounded"
              src={product.img}
            />
            <div className="  w-full lg:pl-14 xl:pl-20 lg:py-6  lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                <span className="text-blue-600 text-xl">PRE-OWNED</span>
                Clothing Brand
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                {product.title} {"   "}
                <span className="text-xl font-medium">
                  ({product.size} / {product.color})
                </span>
              </h1>

              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).includes("yellow") &&
                    Object.keys(variants["yellow"]).includes(size) && (
                      <button
                        onChange={() => {
                          refreshVariant(size, "yellow");
                        }}
                        className={`border-2 border-gray-300 bg-yellow-300 rounded-full w-6 h-6 focus:outline-none ${
                          color === "yellow"
                            ? "border-black"
                            : "border-gray-400"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("red") &&
                    Object.keys(variants["red"]).includes(size) && (
                      <button
                        onChange={() => {
                          refreshVariant(size, "red");
                        }}
                        className={`border-2 border-gray-300 bg-red-600 rounded-full w-6 h-6 focus:outline-none ${
                          color === "red" ? "border-black" : "border-gray-400"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("blue") &&
                    Object.keys(variants["blue"]).includes(size) && (
                      <button
                        onChange={() => {
                          refreshVariant(size, "blue");
                        }}
                        className={`border-2 border-gray-300 bg-blue-700 rounded-full w-6 h-6 focus:outline-none ${
                          color === "blue" ? "border-black" : "border-gray-400"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("purple") &&
                    Object.keys(variants["purple"]).includes(size) && (
                      <button
                        onChange={() => {
                          refreshVariant(size, "purple");
                        }}
                        className={`border-2 border-gray-300 bg-purple-600 rounded-full w-6 h-6 focus:outline-none ${
                          color === "purple"
                            ? "border-black"
                            : "border-gray-400"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("green") &&
                    Object.keys(variants["green"]).includes(size) && (
                      <button
                        onChange={() => {
                          refreshVariant(size, "green");
                        }}
                        className={`border-2 border-gray-300 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${
                          color === "green" ? "border-black" : "border-gray-400"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("pink") &&
                    Object.keys(variants["pink"]).includes(size) && (
                      <button
                        onChange={() => {
                          refreshVariant(size, "pink");
                        }}
                        className={`border-2 border-gray-300 bg-pink-500 rounded-full w-6 h-6 focus:outline-none ${
                          color === "pink" ? "border-black" : "border-gray-400"
                        }`}
                      ></button>
                    )}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={size}
                      onChange={(e) => {
                        refreshVariant(e.target.value, color);
                      }}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                    >
                      {Object.keys(variants[color]).includes("S") && (
                        <option value={"S"}>S</option>
                      )}
                      {Object.keys(variants[color]).includes("M") && (
                        <option value={"M"}>M</option>
                      )}
                      {Object.keys(variants[color]).includes("L") && (
                        <option value={"L"}>L</option>
                      )}
                      {Object.keys(variants[color]).includes("XL") && (
                        <option value={"XL"}>XL</option>
                      )}
                      {Object.keys(variants[color]).includes("XXL") && (
                        <option value={"XXL"}>XXL</option>
                      )}
                    </select>
                    {/* <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center  justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span> */}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex space-x-8">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Rs. {product.price}
                </span>
                <button
                  onClick={() => {
                    buyNow(
                      slug,
                      1,
                      product.title,
                      product.price,
                      product.size,
                      product.color
                    );
                  }}
                  className=" px-6 py-3    text-white bg-indigo-500 border-0  focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    addToCart(
                      slug,
                      1,
                      product.title,
                      product.price,
                      product.size,
                      product.color
                    );
                  }}
                  className="px-6 py-3    text-white bg-indigo-500 border-0  focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Add to Cart
                </button>
                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button> */}
              </div>
              <div className="flex space-x-10 mt-10 ">
                <input
                  onChange={onChangePin}
                  type="text"
                  placeholder="Enter Pin Code"
                  className="  bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                <button
                  onClick={checkserviceability}
                  className="px-6 py-3    text-white bg-indigo-500 border-0  focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Check
                </button>
              </div>
              {!service && service != null && (
                <div className="text-red-600 text-sm mt-3">
                  {/* sorry we do not deliver to this pin code yet */}
                </div>
              )}
              {service && service != null && (
                <div className="text-green-600 text-sm mt-3">
                  {/* yahu! this pin code is serviceable */}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let product = await Product.findOne({ slug: context.query.slug });
  let variants = await Product.find({ title: product.title });
  let colorSizeSlug = {};
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    }, // will be passed to the page component as props
  };
}

export default Slug;
