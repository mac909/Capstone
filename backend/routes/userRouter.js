const expess = require("express");
const router = expess.Router();

router.get("/", (req, res) => {
	res.status(200).send("Hello World!");
});

module.exports = router;
