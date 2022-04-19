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

		app.get('/', (req, res)=>{
			res.end(`
				<div>
					<nav>
						<ul>
							<li>
								<a href="/">Home</a>
							</li>
							<li>
								<a href="/about">About</a>
							</li>		
						</ul>
					</nav>
					<h1>Home page</h1>
				</div>
			`)
		})
		
		app.get('/about', (req, res)=>{
			res.end(`
				<div>
					<nav>
						<ul>
							<li>
								<a href="/">Home</a>
							</li>
							<li>
								<a href="/about">About</a>
							</li>		
						</ul>
					</nav>
					<h1>About page</h1>
				</div>
			`)
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