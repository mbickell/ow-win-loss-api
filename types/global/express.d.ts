import { JwtPayload } from "jsonwebtoken";
import { Model } from "mongoose";
import { ILoginDetails } from "../core/auth";
import { IHero } from "../hero/hero";
import { IFullRecord, IRecord } from "../record/record";

// access the global scope inside our module
declare global {
  namespace Express {
    // introduce another declaration of interface Express.User which will merge with any others
    interface Request {
      context: {
        models: {
          User: Model<ILoginDetails>;
          Hero: Model<IHero>;
          Record: Model<IRecord>;
          FullRecord: Model<IFullRecord>;
        };
      };
      user: JwtPayload;
    }
  }
}

// ensure file is parsed as a module
export {};
