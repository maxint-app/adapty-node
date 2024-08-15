import Endpoint from "./endpoint.js";
export declare class PurchaseEndpoint extends Endpoint {
    validate(body: {
        customerUserId: string;
        stripeToken: string;
    }): Promise<void>;
}
