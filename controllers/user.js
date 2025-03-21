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

exports.deleteUser = async (req, res) => {
	try {

		const user_id = req.params.id;

		if (!user_id) {
			return res.status(400)
				.json({
					success: false,
					message: "kinldy provide an user id "
				})
		}

		const response = await userModel.findByIdAndDelete(user_id);

		return res.status(200)
			.json({
				success: true,
				message: 'user is deleted succesfuly',
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