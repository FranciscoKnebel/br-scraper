/* eslint import/no-extraneous-dependencies: 0 */

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const app = express();

dotenv.load();

app.set('env', process.env.NODE_ENV);

if (app.get('env') === 'production') {
	console.log('Production mode.');
	app.use(morgan('tiny'));
} else {
	console.log('Development mode.');
	app.use(morgan('dev'));
}

require('./stores')(app);

const port = process.env.PORT || 3000;
const listener = app.listen(port, () => {
	console.log(`Listening on port ${listener.address().port}`);
});
