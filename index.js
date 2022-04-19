const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const PORT = process.env.PORT || config.get('port')
const mongoUri = process.env.MONGO_URI || config.get('mongoUri')
const app = express()

app.use('/api/auth', require('./routes/auth.routes'))// /api/auth используется как префикс, из файла берем все роуты

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