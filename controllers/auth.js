const userSchema = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.register = async (req, res) => {
	try {

		const { fname, lname, email, password } = req.body;

		if (!fname || !lname || !email || !password) {
			return res.status(400)
				.json({
					success: false,
					message: 'kindly provide all data'
				})
		}

		const is_existing = await userSchema.findOne({ email });

		if (is_existing) {
			return res.status(400)
				.json({
					success: false,
					message: 'kindly login yourself'
				})

		}


		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await userSchema.create({ fname, lname, email, password: hashedPassword });
		return res.status(200)
			.json({
				success: true,
				message: 'user is registered successfully',
				data: user
			})

	}
	catch (error) {
		console.log(error)
		//  system error , server error
		return res.status(500)
			.json({
				success: false,
				message: "Internal server error occured"
			})

	}
}


exports.login = async (req, res) => {
	try {

		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400)
				.json({
					success: false,
					message: 'kindly provide credentils'
				})
		}

		const is_existing = await userSchema.findOne({ email });

		if (!is_existing) {
			return res.status(400)
				.json({
					success: false,
					message: 'kindly register  yourself'
				})

		}


		if (await bcrypt.compare(password, is_existing.password)) {


			const token = jwt.sign({
				_id: is_existing._id
			},
				process.env.JWT_SECRET,
				{
					//  token expiry
					expiresIn: "30d"
				})

			return res.cookie("token", token, {
				httpOnly: true,
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
			})
				.status(200)
				.json({
					success: true,
					message: 'user is registered  succesfully ',
					data: is_existing
				})


		} else {
			return res.status(400)
				.json({
					success: false,
					message: 'password is incorrect '
				})

		}

	}
	catch (error) {
		console.log(error)
		//  system error , server error
		return res.status(500)
			.json({
				success: false,
				message: "Internal server error occured"
			})

	}
}




exports.logout = async (req, res) => {
	try {


		return res.cookie("token", null, {
			httpOnly: true,
			expires: new Date(Date.now())
		})
			.status(200)
			.json({
				success: true,
				message: 'user is logged out successfully  ',

			})



	}
	catch (error) {
		console.log(error)
		//  system error , server error
		return res.status(500)
			.json({
				success: false,
				message: "Internal server error occured"
			})

	}
}