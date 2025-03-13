const express = require("express");
const app = express();
// const dotenv = require("dotenv")
// dotenv.config()
require("dotenv").config()


app.use(express.json());

const cookies = require("cookie-parser");
app.use(cookies())


app.get("/", (req, res) => {
	return res.status(200)
		.json({
			success: true,
			message: "server is up and running "
		})
})

const dbConnect = require("./config/dbConnect");
dbConnect()

const authRoutes = require("./routes/authRoutes");
app.use("/api/v1/auth", authRoutes)


app.listen(process.env.PORT, () => {
	console.log("srever is lisetining at :  4000")

})