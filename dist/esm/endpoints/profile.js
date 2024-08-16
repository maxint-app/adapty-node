import { objectKeysCamelCaseToSnakeCase, objectKeysSnakeCaseToCamelCase, objectRemoveUndefined, objectRemoveUndefinedOrNull, } from "../utils/object.js";
import Endpoint from "./endpoint.js";
export class ProfileEndpoint extends Endpoint {
    async get(id, config = { extended: false }) {
        const response = await this.axios.get(`/profiles/${id}/${config.extended ? "?extended=true" : ""}`);
        if (config.extended) {
            const data = objectKeysSnakeCaseToCamelCase(response.data.data);
            return data;
        }
        const data = objectKeysSnakeCaseToCamelCase(response.data.data);
        return data;
    }
    async create(customUserId, attributes) {
        const response = await this.axios.post("/profiles/", {
            customer_user_id: customUserId,
            ...objectKeysCamelCaseToSnakeCase(objectRemoveUndefined(attributes ?? {})),
        });
        const data = objectKeysSnakeCaseToCamelCase(response.data.data);
        return data;
    }
    async updateAttributes({ id, ...body }) {
        const response = await this.axios.patch(`/profiles/${id}/`, objectKeysCamelCaseToSnakeCase(objectRemoveUndefined(body)));
        const data = objectKeysSnakeCaseToCamelCase(response.data.data);
        return data;
    }
    async deleteUser(id) {
        await this.axios.delete(`/profiles/${id}/delete`);
    }
    async grantAccessLevel({ accessLevel, id, ...body }) {
        const snakeCaseBody = objectKeysCamelCaseToSnakeCase(objectRemoveUndefinedOrNull(body));
        const response = await this.axios.post(`/profiles/${id}/paid-access-levels/${accessLevel}/grant/`, snakeCaseBody);
        const data = objectKeysSnakeCaseToCamelCase(response.data.data);
        return data;
    }
    async revokeAccessLevel({ accessLevel, id, ...body }) {
        const snakeCaseBody = objectKeysCamelCaseToSnakeCase(objectRemoveUndefinedOrNull(body));
        await this.axios.post(`/profiles/${id}/paid-access-levels/${accessLevel}/revoke/`, snakeCaseBody);
    }
}
//# sourceMappingURL=profile.js.map