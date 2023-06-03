const Operations = require("../models/operationsModel");

async function operationsDeleteMiddleware(next) {
	try {
		await Operations.deleteMany({ jobID: this._id });
		next();
	} catch (error) {
		next(error);
	}
}

module.exports = operationsDeleteMiddleware;
