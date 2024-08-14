import type { AxiosInstance } from "axios";

export default abstract class Endpoint {
	axios: AxiosInstance;

	constructor(axios: AxiosInstance) {
		this.axios = axios;
	}
}
