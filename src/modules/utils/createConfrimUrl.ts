"use strict";
import { v4 } from "uuid";
import { redis } from "../../redis";
import {
  confirmUserPrefix,
  forgotPasswordPrefix,
} from "../constants/redisPrefixs";
// async..await is not allowed in global scope, must use a wrapper
export async function createConfrimUrl(userId: number, type: string = "1") {
  const token = v4();
  const PREFIX: string = type == "1" ? confirmUserPrefix : forgotPasswordPrefix;
  await redis.set(PREFIX + token, userId, "ex", 60 * 60 * 24);
  let url = "";
  switch (type) {
    case "1": // confirm
      url = `http://localhost:3000/user/confirm/${token}`;
      break;
    case "2": //forget password
      url = `http//localhost:3000/user/forgetpassword/${token}`;
      break;
    default:
      url = `http://localhost:3000/user/confirm/${token}`;
  }
  return url;
}
