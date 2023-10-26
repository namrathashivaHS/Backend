import { login, admin, student, teacher, parents, progress, attendance } from "./user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {ObjectId} from "mongodb";

dotenv.config();

const checkUser = async (req, res, next) => {
  const token = req.body.cookies;
  console.log(req.body.cookies);
  console.log(req.body,"body");
  let user=null;
  if (token) {
    jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        user = null;
        next();
        return res.json({status:false, user:user});
      } else {
        console.log(decodedToken.id);
        user = await login.findOne({_id:new ObjectId(decodedToken.id)});
        next();
        return res.json({status:true, user:user});
      }
    });
  } else {
    user = null;
    next();
    return res.json({status:false, user});
  }
  
};

export { userVerification, checkUser };
