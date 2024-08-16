import { camelizeObject, objectRemoveUndefined, objectRemoveUndefinedOrNull, snakifyObject, } from "../utils/object.js";
import Endpoint from "./endpoint.js";
export class ProfileEndpoint extends Endpoint {
    async get(id, config = { extended: false }) {
        const response = await this.axios.get(`/profiles/${id}/${config.extended ? "?extended=true" : ""}`);
        const data = camelizeObject(response.data.data);
        return data;
    }
    async create(customUserId, attributes) {
        const response = await this.axios.post("/profiles/", {
            customer_user_id: customUserId,
            ...snakifyObject(objectRemoveUndefined(attributes ?? {})),
        });
        const data = camelizeObject(response.data.data);
        return data;
    }
    async updateAttributes({ id, ...body }) {
        const response = await this.axios.patch(`/profiles/${id}/`, snakifyObject(objectRemoveUndefined(body)));
        const data = camelizeObject(response.data.data);
        return data;
    }
    async deleteUser(id) {
        await this.axios.delete(`/profiles/${id}/delete`);
    }
    async grantAccessLevel({ accessLevel, id, ...body }) {
        const snakeCaseBody = snakifyObject(objectRemoveUndefinedOrNull(body));
        const response = await this.axios.post(`/profiles/${id}/paid-access-levels/${accessLevel}/grant/`, snakeCaseBody);
        const data = camelizeObject(response.data.data);
        return data;
    }
    async revokeAccessLevel({ accessLevel, id, ...body }) {
        const snakeCaseBody = snakifyObject(objectRemoveUndefinedOrNull(body));
        await this.axios.post(`/profiles/${id}/paid-access-levels/${accessLevel}/revoke/`, snakeCaseBody);
    }
}
//# sourceMappingURL=profile.js.map