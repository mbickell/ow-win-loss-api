import { JwtPayload } from "jsonwebtoken";
import { Model } from "mongoose";
import { ILoginDetails } from "../core/auth";
import { IHero } from "../hero/hero";

// access the global scope inside our module
declare global {
  namespace Express {
    // introduce another declaration of interface Express.User which will merge with any others
    interface Request {
      context: {
        models: {
          User: Model<ILoginDetails>;
          Hero: Model<IHero>;
        };
      };
      user: JwtPayload;
    }
  }
}

// ensure file is parsed as a module
export {};
