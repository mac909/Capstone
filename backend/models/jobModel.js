const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
	{
		customer: {
			type: String,
			required: [true, "Please enter customer name"],
		},
		description: {
			type: String,
			required: [true, "Please enter job description"],
		},
		dueDate: {
			type: Date,
			required: [true, "Please enter due date"],
		},
		poNumber: {
			type: String,
			required: [true, "Please enter PO number"],
		},
		quantity: {
			type: Number,
			required: [true, "Please enter quantity"],
		},
		price: {
			type: Number,
			required: [true, "Please enter price"],
		},
		operations: {
			type: Array,
			required: [true, "Please enter operations"],
		},
		status: {
			type: String,
			required: [true, "Please enter status"],
		},
		notes: {
			type: String,
			required: [true, "Please enter notes"],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Job", jobSchema);
