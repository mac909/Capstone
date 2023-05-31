import axios from "axios";

const API_URL = "/api/jobs";

// Get all jobs
const getJobs = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);
	return response.data;
};

const jobService = {
	getJobs,
};

export default jobService;
