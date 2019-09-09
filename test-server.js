// Server to store user and password

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const write = require('write')

const app = express()
const port = 5000
app.use(bodyParser.json())

app.use(cors())
app.listen(port, () => console.log('listening on port 5000'))

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Good.' })
})

app.get('/api/:user/:pass', async (req, res) => {
	console.log('at least')
	try {
		const { user, pass } = req.params
		write(`${user}.txt`, pass, err => {
			if (err) res.status(400).json({ message: 'Bad Request.' })
			res.status(200).json({ message: 'Good.' })
		})
	} catch (e) {
		res.status(400).json({ message: 'Bad Request.' })
	}
})
