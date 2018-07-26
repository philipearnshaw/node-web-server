const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
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

//app.use((requ, resp, next) => {
//	resp.render('maintenance.hbs');
//});

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (requ, resp) => {  // root route handler
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

app.get('/projects', (requ, resp) => {
	resp.render('projects.hbs');
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});  // Binds to 3000 and will never stop and has to be ctrl-c