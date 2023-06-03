const mongoose = require("mongoose");
const operationsDeleteMiddleware = require("../middleware/operationsDeleteMiddleware");

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
			type: String,
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
		},
		status: {
			type: String,
			required: [true, "Please enter status"],
		},
		notes: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

jobSchema.pre("deleteOne", { document: true }, operationsDeleteMiddleware);

module.exports = mongoose.model("Job", jobSchema);
