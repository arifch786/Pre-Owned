// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../Models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      const bytes = CryptoJS.AES.decrypt(user.password, "secret123");
      let decreptedpass = bytes.toString(CryptoJS.enc.Utf8);
      if (req.body.email == user.email && req.body.password == decreptedpass) {
        var token = jwt.sign(
          { email: user.email, password: user.password },
          "jwtsecret123"
        );
        res.status(200).json({ success: true, token });
      } else {
        res.status(200).json({ success: false, error: "Invalid Credentials" });
      }
    } else {
      res.status(200).json({ success: false, error: "No user Found" });
    }
  }
};
export default connectDb(handler);
