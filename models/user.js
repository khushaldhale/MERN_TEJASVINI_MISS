const mongoose = require("mongoose");



const userSchema = new mongoose.Schema(
	{

		fname: {
			type: String,
			required: true,
			unique: true,
			set: (value) => {
				return value.toUpperCase()
			},
			get: (value) => {
				return value.toLowerCase();
			}

		},
		lname: {
			type: String,
			required: true,

		},
		email: {
			type: String,
			required: true
		},
		age: {
			type: Number,
			unique: true,
			//  this is object , it has two keys 
			//  validator:  which is function or daata member 
			// message :" which is state hre"
			validate: {

				validator: (value) => {
					return value > 0
				},
				message: "age  should not be less tahn zero"
			}
		},
		accountType: {
			type: String,
			enum: ["admin", "user"]
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

	},
	{
		toObject: { getters: true }, // Apply getters when using .toObject()
		toJSON: { getters: true } // Apply getters when using .toJSON()
	}
)

module.exports = mongoose.model("USER", userSchema)