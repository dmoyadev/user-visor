import axios from "axios";

const apiDomain = process.env.VUE_APP_API_URL;
const apiURL = apiDomain + 'api/';

export default axios.create({
	baseURL: apiURL,
	headers: {
		// "Authorization": "Basic " + Buffer.from(process.env.VUE_APP_API_USER + ':' + process.env.VUE_APP_API_PASSWORD, 'binary').toString('base64')
	}
});
