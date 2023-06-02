import axios from "axios";

const API_URL = "/api/jobs/";

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

// Get a single job
const getJob = async (id, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(`${API_URL}/${id}`, config);
	return response.data;
};

// Create a new job
const createJob = async (job, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	console.log(job, token);
	const response = await axios.post(API_URL, job, config);
	return response.data;
};

// Update a job
const updateJob = async (id, job, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(`${API_URL}/${id}`, job, config);
	return response.data;
};

// Delete a job
const deleteJob = async (id, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(`${API_URL}/${id}`, config);
	return response.data;
};

const jobService = {
	getJobs,
	getJob,
	createJob,
	updateJob,
	deleteJob,
};

export default jobService;
