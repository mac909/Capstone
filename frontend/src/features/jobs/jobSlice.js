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

export const { resetJob } = jobSlice.actions;
export default jobSlice.reducer;
