const express = require('express');
const app = express();
const catsRoutes = require("./routes/cats")
const ExpressError = require('./expressError');
const middleware = require('./middleware');
const morgan = require("morgan")

// const userRoutes = require('./userRoutes');


app.use(express.json());
// app.use(middleware.logger);
app.use(morgan('dev'))

app.use("/cats", catsRoutes);
// app.use('/users', userRoutes);
// app.get('/favicon.ico', (req, res) => res.sendStatus(204))

app.get('/secret', middleware.checkForPassword, (req, res, next) => {
	return res.send('I LOVE YOU');
});

app.get('/private', middleware.checkForPassword, (req, res, next) => {
	return res.send('YOU HAVE REACHED THE PRIVATE PAGE');
});

// 404 handler
app.use(function(req, res) {
	return new ExpressError('Not Found', 404);
});

// generic error handler
app.use(function(err, req, res, next) {
	// the default status is 500 Internal Server Error
	let status = err.status || 500;

	// set the status and alert the user
	return res.status(status).json({
		error: {
			message: err.message,
			status: status
		}
	});
});

module.exports = app; 