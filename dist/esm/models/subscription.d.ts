export interface AdaptySubscription {
    isActive: boolean;
    isLifetime: boolean;
    isSandbox: boolean;
    willRenew: boolean;
    isInGracePeriod: boolean;
    activatedAt: string;
    expiresAt: string | null;
    startsAt: string | null;
    vendorProductId: string | null;
    basePlanId: string | null;
    vendorTransactionId: string | null;
    vendorOriginalTransactionId: string | null;
    store: "app_store" | "play_store" | "adapty" | "stripe" | null;
    renewedAt: string | null;
    unsubscribedAt: string | null;
    billingIssueDetectedAt: string | null;
    activeIntroductoryOfferType: "free_trial" | "pay_as_you_go" | "pay_up_front" | null;
    activePromotionalOfferType: "free_trial" | "pay_as_you_go" | "pay_up_front" | null;
}
