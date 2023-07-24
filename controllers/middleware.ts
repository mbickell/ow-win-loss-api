import { config } from "dotenv";
import { RequestHandler } from "express";
import { JwtPayload, verify, decode } from "jsonwebtoken";
import { User } from "../models/user";
import { Hero } from "../models/hero";
import { Record } from "../models/record";
import { FullRecord } from "../models/fullRecord";
import { getToken } from "../helpers/jwt";

config();

// CREATE CONTEXT MIDDLEWARE
export const createContext: RequestHandler = (req, res, next) => {
  // put any data you want in the object below to be accessible to all routes
  req.context = {
    models: {
      User,
      Hero,
      Record,
      FullRecord
    }
  };
  next();
};

// MIDDLEWARE FOR AUTHORIZATION (MAKING SURE THEY ARE LOGGED IN)
export const isLoggedIn: RequestHandler = async (req, res, next) => {
  try {
    // check if auth header exists
    if (req.headers.authorization) {
      // parse token from header
      const token = getToken(req.headers.authorization); //split the header and get the token
      if (token) {
        const payload = verify(token, process.env.SECRET);
        if (payload) {
          // store user data in request object
          const newToken = getToken((payload as JwtPayload).Authorization);
          const user = decode(newToken);
          req.user = user;
          next();
        } else {
          res.status(400).json({ error: "token verification failed" });
        }
      } else {
        res.status(400).json({ error: "malformed auth header" });
      }
    } else {
      res.status(400).json({ error: "No authorization header" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
