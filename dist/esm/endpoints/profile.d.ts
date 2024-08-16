import type { AdaptyProfileAccessLevelGrantRequestOptions, AdaptyProfileResponse, AdaptyProfileAccessLevelRevokeRequestOptions, AdaptyProfileExtendedResponse, AdaptyUserAttributesUpdateRequest } from "../models/profile.js";
import Endpoint from "./endpoint.js";
export declare class ProfileEndpoint extends Endpoint {
    get(id: string, config?: {
        extended: boolean;
    }): Promise<AdaptyProfileResponse | AdaptyProfileExtendedResponse>;
    create(customUserId: string, attributes?: AdaptyUserAttributesUpdateRequest): Promise<AdaptyProfileResponse>;
    updateAttributes({ id, ...body }: {
        id: string;
    } & AdaptyUserAttributesUpdateRequest): Promise<AdaptyProfileResponse>;
    deleteUser(id: string): Promise<void>;
    grantAccessLevel({ accessLevel, id, ...body }: AdaptyProfileAccessLevelGrantRequestOptions): Promise<AdaptyProfileResponse>;
    revokeAccessLevel({ accessLevel, id, ...body }: AdaptyProfileAccessLevelRevokeRequestOptions): Promise<void>;
}
