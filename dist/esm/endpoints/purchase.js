import { objectKeysCamelCaseToSnakeCase } from "../utils/object.js";
import Endpoint from "./endpoint.js";
export class PurchaseEndpoint extends Endpoint {
    async validate(body) {
        const snakeCaseBody = objectKeysCamelCaseToSnakeCase(body);
        await this.axios.post("/purchase/stripe/token/validate/", {
            data: {
                type: "stripe_receipt_validation_result",
                attributes: snakeCaseBody,
            },
        }, {
            headers: {
                "Content-Type": "application/vnd.api+json",
                Accept: "*/*",
            },
        });
    }
}
//# sourceMappingURL=purchase.js.map