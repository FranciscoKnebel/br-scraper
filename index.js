const express = require('express');
const cheerio = require('cheerio');
// const fs = require('fs');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const request = require('request-promise');

const priceParse = (price) => {
	const splitPrice = String(price).replace(/[R$.]/g, '').match(/-?[\d,]+/);

	if (splitPrice == null) {
		return NaN;
	}

	return splitPrice;
};

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

//
app.get('/', (req, res) => {
	const url = 'http://www.kabum.com.br/produto/80660/placa-mae-asus-p-intel-lga-1151-matx-b150m-pro-ga-';

	const options = {
		uri: url,
		transform: body => cheerio.load(body),
		encoding: 'binary',
	};

	request(options)
	.then(($) => {
		if (!$) {
			return res.send('error');
		}

		console.log($);

		const name = $('div#titulo_det').text().trim();
		const regularPrice = priceParse($('.preco_normal').text().trim());
		const discountPrice = priceParse($('span.preco_desconto span').text().trim());

		const json = {
			name,
			regularPrice,
			discountPrice,
			batata: 'batata',
		};

		console.log(json);

		res.send(json);
	})
	.catch((error) => {
		console.error(error);
		res.send(error);
	});
});

//

const port = process.env.PORT || 3000;
const listener = app.listen(port, () => {
	console.log(`Ouvindo na porta ${listener.address().port}`);
});
