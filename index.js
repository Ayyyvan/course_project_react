const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const PORT = process.env.PORT || config.get('port')
const mongoUri = process.env.MONGO_URI || config.get('mongoUri')
const path = require('path')
const buildPath = path.join(__dirname, "client", "build")
const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/collection', require('./routes/collection.routes'))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(buildPath))
  app.get("/*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

async function start(){
	try{
		await mongoose.connect(mongoUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})

		app.listen(PORT, () => {
			console.log(`Server has been started on port ${PORT}...`)
		})

	} catch(e){
		console.log('Server error', e.message)
		process.exit(1)
	}
	
}
start()