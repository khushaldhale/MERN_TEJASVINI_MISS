const express = require("express");
const app = express();
// const dotenv = require("dotenv")
// dotenv.config()
require("dotenv").config()
const cloudinary = require("cloudinary").v2
const { createUser, getUsers, deleteUser } = require("./controllers/user");
const { authentication, isAdmin } = require("./middlewares/authentication");


app.use(express.json());

const cookies = require("cookie-parser");
app.use(cookies())

//  npm i express -fileupload instlled in local syatem 
// import with the require
const fileUpload = require("express-fileupload");
// used it as middleware 
app.use(fileUpload(
	{
		tempFileDir: "/temp",
		useTempFiles: true
	}
))


app.get("/", (req, res) => {
	return res.status(200)
		.json({
			success: true,
			message: "server is up and running "
		})
})

app.post("/file", async (req, res) => {
	try {

		// while dealing with files , u have to retrive data from req.files
		// req.files

		const image = req.files.imageFile;

		//  file received , have to stre it over server 
		// path should be root path 

		// console.log(__dirname)


		// uploaded to server 
		// image.mv(__dirname + "/uploaded-files/" + image.name, (error) => {
		// 	if (error) {
		// 		console.log("error occured while uploading the files")
		// 	}
		// })

		const folder = "NGO"

		const options = {
			folder: folder,
			resource_type: "auto"
		}

		const response = await cloudinary.uploader.upload(image.tempFilePath, options)

		console.log(response)



		return res.status(200)
			.json({
				success: true,
				message: "file received"
			})
	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "error occured while gtting the file  "
			})
	}
})

const dbConnect = require("./config/dbConnect");
dbConnect()

app.post("/user", createUser);
app.get("/user", getUsers);

app.delete("/user/:id", authentication, isAdmin, deleteUser)

const cloudinaryConnect = require("./config/cloudConnect");
cloudinaryConnect()

const authRoutes = require("./routes/authRoutes");
app.use("/api/v1/auth", authRoutes)


app.listen(process.env.PORT, () => {
	console.log("srever is lisetining at :  4000")

})