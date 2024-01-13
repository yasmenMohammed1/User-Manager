import fba from "firebase-admin";
import { config } from "./config.js";

export const sdk = fba.initializeApp({
  credential: fba.credential.cert(config),
});
