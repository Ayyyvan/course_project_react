const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const PORT = process.env.PORT
const mongoUri = process.env.MONGO_URI
const path = require('path')
const buildPath = path.join(__dirname, "client", "build")
const cookieParser = require('cookie-parser')
const app = express()
const errorMiddleware = require('./middleware/error.middleware')

app.use(express.json({ extended: true }))
app.use(cookieParser())
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/collection', require('./routes/collection.routes'))
app.use(errorMiddleware)

async function start(){
	try{
		await mongoose.connect(mongoUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		
		if (process.env.NODE_ENV === "production") {
			app.use(express.static(buildPath))
			app.get("/*", (req, res) => {
				res.sendFile(path.join(buildPath, "index.html"));
			});
		}

		app.listen(PORT, () => {
			console.log(`Server has been started on port ${PORT}...`)
		})

	} catch(e){
		console.log('Server error', e.message)
		process.exit(1)
	}
	
}
start()