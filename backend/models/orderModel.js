const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
	{
		text: {
			type: String,
			required: [true, "Please enter some text"],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Order", orderSchema);
