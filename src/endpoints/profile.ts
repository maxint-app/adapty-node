import type {
	AdaptyProfileAccessLevelGrantRequestOptions,
	AdaptyProfileResponse,
	AdaptyProfileAccessLevelRevokeRequestOptions,
	AdaptyProfileExtendedResponse,
	AdaptyUserAttributesUpdateRequest,
} from "../models/profile.js";
import type { KeysToSnakeCase } from "../utils/object.js";
import {
	objectKeysCamelCaseToSnakeCase,
	objectKeysSnakeCaseToCamelCase,
	objectRemoveUndefined,
	objectRemoveUndefinedOrNull,
} from "../utils/object.js";
import Endpoint from "./endpoint.js";

export class ProfileEndpoint extends Endpoint {
	async get(
		id: string,
		config: { extended: true },
	): Promise<AdaptyProfileExtendedResponse>;
	async get(
		id: string,
		config = { extended: false },
	): Promise<AdaptyProfileResponse> {
		const response = await this.axios.get(
			`/profiles/${id}${config.extended ? "?extended=true" : ""}`,
		);

		if (config.extended) {
			const data = objectKeysSnakeCaseToCamelCase(
				response.data.data as KeysToSnakeCase<AdaptyProfileExtendedResponse>,
			);

			return data;
		}

		const data = objectKeysSnakeCaseToCamelCase(
			response.data.data as KeysToSnakeCase<AdaptyProfileResponse>,
		);

		return data;
	}

	async create(
		customUserId: string,
		attributes?: AdaptyUserAttributesUpdateRequest,
	): Promise<AdaptyProfileResponse> {
		const response = await this.axios.post("/profiles", {
			customer_user_id: customUserId,
			...objectKeysCamelCaseToSnakeCase(
				objectRemoveUndefined(attributes ?? {}),
			),
		});

		const data = objectKeysSnakeCaseToCamelCase(
			response.data.data as KeysToSnakeCase<AdaptyProfileResponse>,
		);

		return data;
	}

	async updateAttributes({
		id,
		...body
	}: {
		id: string;
	} & AdaptyUserAttributesUpdateRequest): Promise<AdaptyProfileResponse> {
		const response = await this.axios.patch(
			`/profiles/${id}`,
			objectKeysCamelCaseToSnakeCase(objectRemoveUndefined(body)),
		);

		const data = objectKeysSnakeCaseToCamelCase(
			response.data.data as KeysToSnakeCase<AdaptyProfileResponse>,
		);

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
		const snakeCaseBody = objectKeysCamelCaseToSnakeCase(
			objectRemoveUndefinedOrNull(body),
		);
		const response = await this.axios.post(
			`/profiles/${id}/paid-access-levels/${accessLevel}/grant`,
			snakeCaseBody,
		);

		const data = objectKeysSnakeCaseToCamelCase(
			response.data.data as KeysToSnakeCase<AdaptyProfileResponse>,
		);

		return data;
	}

	async revokeAccessLevel({
		accessLevel,
		id,
		...body
	}: AdaptyProfileAccessLevelRevokeRequestOptions): Promise<void> {
		const snakeCaseBody = objectKeysCamelCaseToSnakeCase(
			objectRemoveUndefinedOrNull(body),
		);
		await this.axios.post(
			`/profiles/${id}/paid-access-levels/${accessLevel}/revoke`,
			snakeCaseBody,
		);
	}
}
