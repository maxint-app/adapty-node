import type { AdaptyCustomerAccessLevel } from "../models/access_level.js";
import type { AdaptyNonSubscription } from "../models/non_subscription.js";
import type {
	AdaptyProfileAccessLevelGrantRequestOptions,
	AdaptyProfileResponse,
	AdaptyProfileAccessLevelRevokeRequestOptions,
	AdaptyProfileExtendedResponse,
	AdaptyUserAttributesUpdateRequest,
} from "../models/profile.js";
import type { AdaptySubscription } from "../models/subscription.js";
import type { KeysToSnakeCase } from "../utils/object.js";
import {
	objectKeysCamelCaseToSnakeCase,
	objectKeysSnakeCaseToCamelCase,
	objectRemoveUndefined,
	objectRemoveUndefinedOrNull,
} from "../utils/object.js";
import Endpoint from "./endpoint.js";

export class ProfileEndpoint extends Endpoint {
	#profileObjectSnakeCaseToCameCase(
		profile:
			| KeysToSnakeCase<AdaptyProfileResponse>
			| KeysToSnakeCase<AdaptyProfileExtendedResponse>,
	): AdaptyProfileResponse | AdaptyProfileExtendedResponse {
		return {
			...objectKeysSnakeCaseToCamelCase(profile),

			subscriptions: !profile.subscriptions
				? null
				: (Object.fromEntries(
						Object.entries(profile.subscriptions).map(([key, value]) => [
							key,
							objectKeysSnakeCaseToCamelCase(value),
						]),
					) as unknown as Record<string, AdaptySubscription>),
			nonSubscriptions: !profile.non_subscriptions
				? null
				: (Object.fromEntries(
						Object.entries(profile.non_subscriptions).map(([key, value]) => [
							key,
							objectKeysSnakeCaseToCamelCase(value),
						]),
					) as unknown as Record<string, AdaptyNonSubscription>),
			paidAccessLevels: !profile.paid_access_levels
				? null
				: (Object.fromEntries(
						Object.entries(profile.paid_access_levels).map(([key, value]) => [
							key,
							objectKeysSnakeCaseToCamelCase(value),
						]),
					) as unknown as Record<string, AdaptyCustomerAccessLevel>),
		};
	}

	async get(
		id: string,
		config = { extended: false },
	): Promise<AdaptyProfileResponse | AdaptyProfileExtendedResponse> {
		const response = await this.axios.get(
			`/profiles/${id}/${config.extended ? "?extended=true" : ""}`,
		);

		const data = this.#profileObjectSnakeCaseToCameCase(response.data.data);

		return data;
	}

	async create(
		customUserId: string,
		attributes?: AdaptyUserAttributesUpdateRequest,
	): Promise<AdaptyProfileResponse> {
		const response = await this.axios.post("/profiles/", {
			customer_user_id: customUserId,
			...objectKeysCamelCaseToSnakeCase(
				objectRemoveUndefined(attributes ?? {}),
			),
		});

		const data = this.#profileObjectSnakeCaseToCameCase(
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
			`/profiles/${id}/`,
			objectKeysCamelCaseToSnakeCase(objectRemoveUndefined(body)),
		);

		const data = this.#profileObjectSnakeCaseToCameCase(
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
			`/profiles/${id}/paid-access-levels/${accessLevel}/grant/`,
			snakeCaseBody,
		);

		const data = this.#profileObjectSnakeCaseToCameCase(
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
			`/profiles/${id}/paid-access-levels/${accessLevel}/revoke/`,
			snakeCaseBody,
		);
	}
}
