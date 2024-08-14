import type { AdaptyCustomerAccessLevel } from "./access_level.js";
import type { AdaptyNonSubscription } from "./non_subscription.js";
import type { AdaptySubscription } from "./subscription.js";

export interface AdaptyProfile {
	profileId: string;
	customerUserId: string | null;
	totalRevenueUsd: number;
	paidAccessLevels: Record<string, AdaptyCustomerAccessLevel> | null;
	subscriptions: Record<string, AdaptySubscription> | null;
	nonSubscriptions: Record<string, AdaptyNonSubscription> | null;
	customAttributes: Record<string, string> | null;
}

export interface AdaptyProfileResponse {
	appId: string;
	profileId: string;
	customerUserId: string;
	paidAccessLevels: Record<string, AdaptyCustomerAccessLevel> | null;
	subscriptions: Record<string, AdaptySubscription> | null;
	nonSubscriptions: Record<string, AdaptyNonSubscription> | null;
}

export interface AdaptyUserAttributesUpdateRequest {
	ipCountry?: string | null;
	email?: string | null;
	phoneNumber?: string | null;
	firstName?: string | null;
	lastName?: string | null;
	gender?: string | null;
	birthday?: string | null;
	customAttributes?: Record<string, string | number> | null;
}

export interface AdaptyProfileExtendedResponse extends AdaptyProfileResponse {
	createdAt: string;
	email: string | null;
	phoneNumber: string | null;
	attStatus: string | null;
	firstName: string | null;
	lastName: string | null;
	username: string | null;
	gender: string | null;
	birthday: string | null;
	idfa: string | null;
	idfv: string | null;
	advertisingId: string | null;
	appsflyerId: string | null;
	amplitudeUserId: string | null;
	amplitudeDeviceId: string | null;
	mixpanelUserId: string | null;
	appMetricaDeviceId: string | null;
	appMetricaProfileId: string | null;
	facebookAnonymousId: string | null;
}

export interface AdaptyProfileAccessLevelGrantRequestOptions {
	id: string;
	accessLevel: string;
	expiresAt: string;
	durationDays: number;
	isLifetime: boolean;
	basePlanId: string;
	startsAt?: string;
	vendorProductId?: string;
	vendorOriginalTransactionId?: string;
	vendorTransactionId?: string;
	store?: string;
	introductoryOfferType?: "free_trial" | "pay_as_you_go" | "pay_up_front";
	price?: number;
	priceLocale?: string;
	isSandbox?: boolean;
}

export type AdaptyProfileAccessLevelRevokeRequestOptions = Pick<
	AdaptyProfileAccessLevelGrantRequestOptions,
	"id" | "accessLevel"
> & {
	isRefund: boolean;
};
