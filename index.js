const express = require('express');
// const fs = require('fs');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

dotenv.load();

app.use(helmet());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view options', { layout: false });
app.engine('html', require('ejs').renderFile);

app.set('views', `${__dirname}/public/views`);
app.set('view engine', 'ejs');
app.set('env', process.env.NODE_ENV);

if (app.get('env') === 'production') {
	console.log('Server funcionando no modo de produção.');
	app.use(morgan('tiny'));
	app.use(compression());
} else {
	console.log('Server funcionando no modo de desenvolvimento.');
	app.use(morgan('dev'));
}

require('./server/tests')(app);

const port = process.env.PORT || 3000;
const listener = app.listen(port, () => {
	console.log(`Ouvindo na porta ${listener.address().port}`);
});
