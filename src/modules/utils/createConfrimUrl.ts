"use strict";
import { v4 } from "uuid";
import { redis } from "../../redis";
// async..await is not allowed in global scope, must use a wrapper
export async function createConfrimUrl(userId: number) {
  const token = v4();
  await redis.set(token, userId, "ex", 60 * 60 * 24);
  return `http://localhost:3000/user/confirm/${token}`;
  
}