const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const PORT = process.env.PORT || config.get('port')
const mongoUri = process.env.MONGO_URI || config.get('mongoUri')
const path = require('path')
const publicPath = path.join(__dirname, "client", "public")
const app = express()

app.use(express.json({ extended: true }))
app.use(express.static(publicPath))
app.get('*', (req, res) => {
	res.sendFile(path.join(publicPath, 'index.html'));
});
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