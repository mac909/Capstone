const asyncHandler = require("express-async-handler");

const Job = require("../models/jobModel");

// @desc    Fetch all jobs
// @route   GET /api/jobs
// @access  Private/Admin
const getJobs = asyncHandler(async (req, res) => {
	const jobs = await Job.find({});
	res.json(jobs);
});

// @desc    Fetch single job
// @route   GET /api/jobs/:id
// @access  Private/Admin
const getJobById = asyncHandler(async (req, res) => {
	const job = await Job.findById(req.params.id);

	if (job) {
		res.json(job);
	} else {
		res.status(404);
		throw new Error("Job not found");
	}
});

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private/Admin
const deleteJob = asyncHandler(async (req, res) => {
	const jobId = req.params.id;

	const job = await Job.findById(jobId);

	if (!job) {
		res.status(404);
		throw new Error("Job not found");
	}

	// Trigger middleware to delete associated operations
	await job.deleteOne();

	res.status(200).json({ message: "Job deleted" });
});

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private/Admin
const createJob = asyncHandler(async (req, res) => {
	const job = req.body;

	const createdJob = await Job.create(job);
	res.status(201).json(createdJob);
});

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private/Admin
const updateJob = asyncHandler(async (req, res) => {
	const {
		customer,
		description,
		dueDate,
		poNumber,
		quantity,
		price,
		operations,
		status,
		notes,
	} = req.body;

	const job = await Job.findById(req.params.id);

	if (job) {
		job.customer = customer;
		job.description = description;
		job.dueDate = dueDate;
		job.poNumber = poNumber;
		job.quantity = quantity;
		job.price = price;
		job.operations = operations;
		job.status = status;
		job.notes = notes;

		const updatedJob = await job.save();
		res.json(updatedJob);
	} else {
		res.status(404);
		throw new Error("Job not found");
	}
});

module.exports = {
	getJobs,
	getJobById,
	deleteJob,
	createJob,
	updateJob,
};
