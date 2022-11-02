const bcrypt = require("bcrypt");
/**
 * This middleware is for parse User password and bcrypt it
 */
const updatedUserBodyData = async (req, res, next) => {
	const userData = req.body.userData;

	try {
		if (userData.USER_PASSWORD) {
			const _password = await bcrypt.hash(userData.USER_PASSWORD, 10);
			console.log(_password);
			req.body.userData = ({ ...userData, _password });
			next();
		} else {
			req.body.userData = userData;
			next();
		}

	} catch (error) {
		console.log(error)
		return res.status(500).send({
			status: "failed",
			message: "internal-server-error",
		});
	}
};

module.exports = {
	updatedUserBodyData,
};
