import React from "react";
import Link from "next/link";
import Product from "../Models/Product";
import mongoose from "mongoose";

const Hoodies = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container  mx-auto">
          <div className="flex justify-center flex-wrap m-4">
            {Object.keys(products).length === 0 && (
              <p className="flex justify-center text-center text-red-600 mt-20 text-2xl font-bold font-mono">
                Sorry! All Hoodies are currently out of stock.
                <br /> New stock comming soon. stay tuned{" "}
              </p>
            )}
            {Object.keys(products).map((item) => {
              return (
                <Link
                  passHref={true}
                  key={products[item]._id}
                  href={`/Product/${products[item].slug}`}
                >
                  <div className="lg:w-2/5  md:w-3/4 xl:w-1/4 p-4 w-full cursor-pointer shadow-lg m-3">
                    <a className="block relative rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className=" mx-auto h-[36vh] block"
                        src={products[item].img}
                      />
                    </a>
                    <div className="mt-4  text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {products[item].catagory}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {products[item].title}
                      </h2>
                      <p className="mt-1">Rs {products[item].price}</p>
                      <div className="mt-1">
                        {products[item].size.includes("S") && (
                          <span className="border border-gray-600 px-1 mx-1">
                            S
                          </span>
                        )}
                        {products[item].size.includes("M") && (
                          <span className="border border-gray-600 px-1 mx-1">
                            M
                          </span>
                        )}
                        {products[item].size.includes("L") && (
                          <span className="border border-gray-600 px-1 mx-1">
                            L
                          </span>
                        )}
                        {products[item].size.includes("XL") && (
                          <span className="border border-gray-600 px-1 mx-1">
                            XL
                          </span>
                        )}
                        {products[item].size.includes("XXL") && (
                          <span className="border border-gray-600 px-1 mx-1">
                            XXL
                          </span>
                        )}
                      </div>
                      <div className="mt-1">
                        {products[item].color.includes("yellow") && (
                          <button className="border-2 border-gray-300 ml-1 bg-yellow-600 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("red") && (
                          <button className="border-2 border-gray-300 ml-1 bg-red-600 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("blue") && (
                          <button className="border-2 border-gray-300 ml-1 bg-blue-600 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("green") && (
                          <button className="border-2 border-gray-300 ml-1 bg-green-600 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("pink") && (
                          <button className="border-2 border-gray-300 ml-1 bg-pink-400 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                        {products[item].color.includes("purple") && (
                          <button className="border-2 border-gray-300 ml-1 bg-purple-600 rounded-full w-6 h-6 focus:outline-none"></button>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
export async function getServerSideProps(context) {
  if (mongoose.connections[0].readyState) {
  }
  await mongoose.connect(process.env.MONGO_URI);
  let products = await Product.find({ catagory: "hoodies" });
  let hood = {};
  for (let item of products) {
    if (item.title in hood) {
      if (
        !hood[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        hood[item.title].color.push(item.color);
      }
      if (!hood[item.title].size.includes(item.size) && item.availableQty > 0) {
        hood[item.title].size.push(item.size);
      }
    } else {
      hood[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        hood[item.title].color = [item.color];
        hood[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(hood)) }, // will be passed to the page component as props
  };
}
export default Hoodies;
