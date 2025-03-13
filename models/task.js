const mongoose = require("mongoose");



const taskSchema = new mongoose.Schema(
	{
		task_name: {
			type: String,
			required: true
		},
		task_desc: {
			type: String,
			required: true
		},
		// task_status
		// task_deadline

		task_status: {
			type: String,
			required: true,
			enum: ["pending", "in-progress"]
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "USER"
		}
	}
)

module.exports = mongoose.model("TASK", taskSchema)