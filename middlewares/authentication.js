
const jwt = require("jsonwebtoken")
require("dotenv").config()



exports.authentication = async (req, res, next) => {
	try {

		const token = req.cookies.token;

		if (!token) {
			res.status(401)
				.json({
					success: false,
					message: 'kindly login yourself ',

				})
		}


		const decode = jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {


			if (error) {
				res.status(401)
					.json({
						success: false,
						message: 'invalid token, token expired  ',

					})

			}

			req.decode = decode;
			next()

		})

	}
	catch (error) {
		res.status(500)
			.json({
				success: false,
				message: 'Internal error occured  ',

			})


	}
}