/**
 * @author Ariful  Islam Toufiq,
 * Software Engineer,
 * Ultra-X BD Ltd.
 *
 * @copyright All right reserved Ultra-X Asia Pacific
 * 
 * @description Login validator for User login
 * 
 */
const loginUserValidation = async (req, res, next) => {

	const user = {
		username: req.body.username,
		password: req.body.password
	}

	if (!user.username || !user.password) {
		return res.status(400).send({
			status: "failed",
			message: "please-enter-username-or-password",
		});
	}

	req.body.user = user;

	next();
}

module.exports = {
	loginUserValidation
}