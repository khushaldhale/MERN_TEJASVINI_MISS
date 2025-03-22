
const jwt = require("jsonwebtoken")
require("dotenv").config()



exports.authentication = async (req, res, next) => {
	try {

		const token = req.cookies.token;

		if (!token) {
			return res.status(401)
				.json({
					success: false,
					message: 'kindly login yourself ',

				})
		}


		const decode = jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {


			if (error) {
				return res.status(401)
					.json({
						success: false,
						message: 'invalid token, token expired  ',

					})

			}

			req.decode = decode;
			return next()

		})

	}
	catch (error) {
		return res.status(500)
			.json({
				success: false,
				message: 'Internal error occured  ',

			})


	}
}



exports.isAdmin = async (req, res, next) => {
	try {



		if (req.decode.accountType === "admin") {
			return next();
		}

		return res.status(403)
			.json({
				succcess: false,
				message: " This is a protected route for admin only "
			})
	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured "
			})
	}
}