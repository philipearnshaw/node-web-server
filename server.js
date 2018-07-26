const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');

app.use((requ, resp, next) => {
	var now = new Date().toString();
	var log = `${now}: ${requ.method} ${requ.url}`;

	console.log(log);  // Wed Jul 25 2018 16:32:05 GMT+0100 (British Summer Time): GET /about
	fs.appendFile('server.log', log + '\n', (err) => {		// Created in the root of the project
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	
	next();
});

app.use((requ, resp, next) => {
	resp.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (requ, resp) => {  // root route handler
//	resp.send('<h1>Hello Express!</h1>');
//	resp.send({
//		name: 'Fred',
//		likes: [
//			'running',
//			'chasing'
//		]
//	});
	resp.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to the server page'
	})
});


app.get('/about', (requ, resp) => {
	resp.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (requ, resp) => {
	resp.send({errorMessage: 'bad request'});
});
app.listen(3000, () => {
	console.log("Server is up on port 3000");
});  // Binds to 3000 and will never stop and has to be ctrl-c