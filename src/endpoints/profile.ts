import type {
	AdaptyProfileAccessLevelGrantRequestOptions,
	AdaptyProfileResponse,
	AdaptyProfileAccessLevelRevokeRequestOptions,
	AdaptyProfileExtendedResponse,
	AdaptyUserAttributesUpdateRequest,
} from "../models/profile.js";
import {
	camelizeObject,
	objectRemoveUndefined,
	objectRemoveUndefinedOrNull,
  snakifyObject,
} from "../utils/object.js";
import Endpoint from "./endpoint.js";

export class ProfileEndpoint extends Endpoint {
	async get(
		id: string,
		config = { extended: false },
	): Promise<AdaptyProfileResponse | AdaptyProfileExtendedResponse> {
		const response = await this.axios.get(
			`/profiles/${id}/${config.extended ? "?extended=true" : ""}`,
		);

		const data = camelizeObject(response.data.data) as unknown as
			| AdaptyProfileResponse
			| AdaptyProfileExtendedResponse;

		return data;
	}

	async create(
		customUserId: string,
		attributes?: AdaptyUserAttributesUpdateRequest,
	): Promise<AdaptyProfileResponse> {
		const response = await this.axios.post("/profiles/", {
			customer_user_id: customUserId,
			...snakifyObject(
				objectRemoveUndefined(attributes ?? {}) as Record<string, unknown>,
			),
		});

		const data = camelizeObject(
			response.data.data,
		) as unknown as AdaptyProfileResponse;

		return data;
	}

	async updateAttributes({
		id,
		...body
	}: {
		id: string;
	} & AdaptyUserAttributesUpdateRequest): Promise<AdaptyProfileResponse> {
		const response = await this.axios.patch(
			`/profiles/${id}/`,
			snakifyObject(objectRemoveUndefined(body)),
		);

		const data = camelizeObject(
			response.data.data,
		) as unknown as AdaptyProfileResponse;

		return data;
	}

	async deleteUser(id: string): Promise<void> {
		await this.axios.delete(`/profiles/${id}/delete`);
	}

	async grantAccessLevel({
		accessLevel,
		id,
		...body
	}: AdaptyProfileAccessLevelGrantRequestOptions): Promise<AdaptyProfileResponse> {
		const snakeCaseBody = snakifyObject(
			objectRemoveUndefinedOrNull(body),
		);
		const response = await this.axios.post(
			`/profiles/${id}/paid-access-levels/${accessLevel}/grant/`,
			snakeCaseBody,
		);

		const data = camelizeObject(
			response.data.data,
		) as unknown as AdaptyProfileResponse;

		return data;
	}

	async revokeAccessLevel({
		accessLevel,
		id,
		...body
	}: AdaptyProfileAccessLevelRevokeRequestOptions): Promise<void> {
		const snakeCaseBody = snakifyObject(
			objectRemoveUndefinedOrNull(body),
		);
		await this.axios.post(
			`/profiles/${id}/paid-access-levels/${accessLevel}/revoke/`,
			snakeCaseBody,
		);
	}
}
