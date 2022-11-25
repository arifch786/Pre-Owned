// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../Models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { name, email } = req.body;

    let u = new User({
      name,
      email,
      password: CryptoJS.AES.encrypt(req.body.password, "secret123").toString(),
    });
    await u.save();
    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "this method is not allowed" });
  }
};
export default connectDb(handler);