export interface AdaptyNonSubscription {
    purchaseId: string;
    purchasedAt: string;
    isOneTime: boolean;
    isSandbox: boolean;
    vendorProductId: string | null;
    vendorTransactionId: string | null;
    vendorOriginalTransactionId: string | null;
    store: "app_store" | "play_store" | "adapty" | "stripe" | null;
}
