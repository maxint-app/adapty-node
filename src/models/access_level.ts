export interface AdaptyCustomerAccessLevel {
	id: string;
	isActive: boolean;
	isLifetime: boolean;
	activatedAt: string;
	willRenew: boolean;
	isInGracePeriod: boolean;
	expiresAt: string | null;
	startsAt: string | null;
	vendorProductId: string | null;
	basePlainId: string | null;
	store: "app_store" | "play_store" | "adapty" | null;
	renewedAt: string | null;
	unsubscribedAt: string | null;
	billingIssueDetectedAt: string | null;
	activeIntroductoryOfferType: string | null;
	activePromotionalOfferType: string | null;
}
