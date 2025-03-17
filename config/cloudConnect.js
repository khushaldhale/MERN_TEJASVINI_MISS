const cloudinary = require("cloudinary").v2


const cloudinaryConnect = () => {
	try {
		cloudinary.config(
			{

				// provide ur credentials
				cloud_name: "",
				api_key: "",
				api_secret: ""
			}
		)

		console.log("connected to cloduinary : ")
	}
	catch (error) {
		console.log("error roccured connecting cloudinary : ", error)
	}
}

module.exports = cloudinaryConnect