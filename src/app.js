require('dotenv').config()
const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()

const path = require('path')
const DanceClassRoutes = require('./routes/danceClassRoutes')
const ParticipantsRoutes = require('./routes/participantRoutes')

app.use(express.json())

app.use('/api/v1/danceClasses', DanceClassRoutes)
app.use('/api/v1/participants', ParticipantsRoutes)


app.use((req, res, next) => {
	console.log(`Processing ${req.method} request to ${req.path}`)
	next()
})

const port = 5001
const run = async () => {
	try {
		mongoose.set('strictQuery', false)
		const conn = await mongoose.connect(process.env.MONGO_URI)
		console.log(`MongoDB connected: ${conn.connection.host}`)

		app.listen(port, () => {
			console.log(`Server is listening on http://localhost:${port}`)
		})
	} catch (error) {
		console.error(error)
	}
}

run()
