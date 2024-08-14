import axios from "axios";
import { ProfileEndpoint } from "./endpoints/profile.js";
import { PurchaseEndpoint } from "./endpoints/purchase.js";

export class AdaptyClient {
	profile: ProfileEndpoint;
	purchases: PurchaseEndpoint;
	constructor(token: string) {
		const client = axios.create({
			baseURL: "https://api.adapty.io/api/v1/sdk",
			responseType: "json",
			headers: {
				Authorization: `Api-Key ${token}`,
				"Content-Type": "application/json",
			},
			validateStatus(status) {
				return status >= 200 && status < 400;
			},
		});

		this.profile = new ProfileEndpoint(client);
		this.purchases = new PurchaseEndpoint(client);
	}
}
