const userModel = require("../models/user");




exports.createUser = async (req, res) => {
	try {

		const { fname, lname, age, email, password } = req.body;

		const response = await userModel.create({ fname, lname, email, password, age });

		return res.status(200)
			.json({
				success: true,
				message: "user is created  succesfully ",
				data: response
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

exports.getUsers = async (req, res) => {
	try {



		const response = await userModel.find({});

		return res.status(200)
			.json({
				success: true,
				message: "users are fetched  ",
				data: response
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