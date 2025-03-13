const mongoose = require("mongoose");



const userSchema = new mongoose.Schema(
	{

		fname: {
			type: String,
			required: true
		},
		lname: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		tasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "TASK"
			}
		]

	}
)

module.exports = mongoose.model("USER", userSchema)