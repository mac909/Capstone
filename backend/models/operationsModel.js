const mongoose = require("mongoose");

const operationsSchema = mongoose.Schema(
	{
		jobID: {
			type: String,
			required: [true, "Please enter job ID"],
			ref: "Job",
		},
		operation: {
			type: String,
			required: [true, "Please enter operation name"],
		},
		status: {
			type: String,
			required: [true, "Please enter status"],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Operations", operationsSchema);
