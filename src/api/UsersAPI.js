import api from "./base/API.js";

const resource = "User";
export default {
	/**
	 * Fetches users data from the API
	 * @param {number} count Number of users to be fetched, default is 100
	 * @returns {Promise<AxiosResponse<any>>}
	 */
	get(count = 100) {
		return api.get("?noinfo&results=" + count);
	},

	getFavorites() {
		return api.get(resource + '/favorites');
	},

	addFavorite(user) {
		return api.post(resource + "/", user);
	},

	deleteFavorite(userId) {
		return api.delete(resource + "/" + userId);
	},
};
