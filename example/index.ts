import { AdaptyClient } from "adapty-node";

const adapty = new AdaptyClient(process.env.ADAPTY_SECRET_KEY as string);

const profile = await adapty.profile.create('testing');

console.log("Profile created:\n", profile);