import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jobService from "./jobService";

const initialState = {
	jobs: [],
	isErrors: false,
	isSuccessJob: false,
	isLoadingJob: false,
	messageJob: "",
};

export const jobSlice = createSlice({
	name: "jobs",
	initialState,
	reducers: {
		resetJob: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getJobs.pending, (state) => {
				state.isLoadingJob = true;
			})
			.addCase(getJobs.fulfilled, (state, action) => {
				state.isLoadingJob = false;
				state.isSuccessJob = true;
				state.jobs = action.payload;
			})
			.addCase(getJobs.rejected, (state, action) => {
				state.isLoadingJob = false;
				state.isErrors = true;
				state.messageJob = action.error.message;
			})
			.addCase(getJob.pending, (state) => {
				state.isLoadingJob = true;
			})
			.addCase(getJob.fulfilled, (state, action) => {
				state.isLoadingJob = false;
				state.isSuccessJob = true;
				state.jobs = action.payload;
			})
			.addCase(getJob.rejected, (state, action) => {
				state.isLoadingJob = false;
				state.isErrors = true;
				state.messageJob = action.error.message;
			})
			.addCase(createJob.pending, (state) => {
				state.isLoadingJob = true;
			})
			.addCase(createJob.fulfilled, (state, action) => {
				state.isLoadingJob = false;
				state.isSuccessJob = true;
				state.jobs.push(action.payload);
			})
			.addCase(createJob.rejected, (state, action) => {
				state.isLoadingJob = false;
				state.isErrors = true;
				state.messageJob = action.error.message;
			})
			.addCase(updateJob.pending, (state) => {
				state.isLoadingJob = true;
			})
			.addCase(updateJob.fulfilled, (state, action) => {
				state.isLoadingJob = false;
				state.isSuccessJob = true;
				state.jobs = action.payload;
			})
			.addCase(updateJob.rejected, (state, action) => {
				state.isLoadingJob = false;
				state.isErrors = true;
				state.messageJob = action.error.message;
			})
			.addCase(deleteJob.pending, (state) => {
				state.isLoadingJob = true;
			})
			.addCase(deleteJob.fulfilled, (state, action) => {
				state.isLoadingJob = false;
				state.isSuccessJob = true;
				state.jobs = state.jobs.filter(
					(job) => job.id !== action.payload
				);
			})
			.addCase(deleteJob.rejected, (state, action) => {
				state.isLoadingJob = false;
				state.isErrors = true;
				state.messageJob = action.error.message;
			});
	},
});

// Get all jobs
export const getJobs = createAsyncThunk("job/getJobs", async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await jobService.getJobs(token);
	} catch (error) {
		const message =
			(error.response &&
				error.response.data &&
				error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Get a single job
export const getJob = createAsyncThunk("job/getJob", async (id, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await jobService.getJob(id, token);
	} catch (error) {
		const message =
			(error.response &&
				error.response.data &&
				error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Create a new job
export const createJob = createAsyncThunk(
	"job/createJob",
	async (job, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await jobService.createJob(job, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Update a job
export const updateJob = createAsyncThunk(
	"job/updateJob",
	async (job, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await jobService.updateJob(job, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Delete a job
export const deleteJob = createAsyncThunk(
	"job/deleteJob",
	async (id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await jobService.deleteJob(id, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const { resetJob } = jobSlice.actions;
export default jobSlice.reducer;
