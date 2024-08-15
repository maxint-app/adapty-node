import { ProfileEndpoint } from "./endpoints/profile.js";
import { PurchaseEndpoint } from "./endpoints/purchase.js";
export declare class AdaptyClient {
    profile: ProfileEndpoint;
    purchases: PurchaseEndpoint;
    constructor(token: string);
}
