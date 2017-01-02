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

//
const stores = require('./stores');

app.get('/test/single', (req, res) => {
	const uri = 'http://www.kabum.com.br/produto/80660/placa-mae-asus-p-intel-lga-1151-matx-b150m-pro-ga-';

	stores.createItemFromStore(uri, 'kabum', (err, item) => {
		if (err) {
			res.send(err);
		} else {
			res.json(item);
		}
	});
});

app.get('/test/multiple', (req, res) => {
	const uris = [
		'http://www.kabum.com.br/produto/80660/placa-mae-asus-p-intel-lga-1151-matx-b150m-pro-ga-',
		'http://www.kabum.com.br/produto/59210/drive-lg-gravador-dvd-rw-24x-sata-preto-gh24nsc0',
		'http://www.kabum.com.br/produto/55934/cartucho-de-tinta-hp-662-preto-cz103ab',
		'http://www.kabum.com.br/produto/77482/smartphone-alcatel-pixi-4-4034e-quad-core-android-6-0-tela-4-8mp-8gb-dual-chip-desbloqueado-preto-capas-extras',
		'http://www.kabum.com.br/produto/65593/fragmentadora-aurora-corte-tiras-6mm-12-folhas-cartaogrampo-cesto-com-18l-110v-as1210sb',
		'http://www.kabum.com.br/produto/65421/baqueta-liverpool-classic-series-7a-ponta-nylon-ll-7an-par',
		'http://www.kabum.com.br/produto/50757/memoria-kingston-hyperx-fury-4gb-1866mhz-ddr3-cl10-black-series-hx318c10fb-4',
	];

	stores.createMultipleItemsFromStore(uris, 'kabum', (err, items) => {
		if (err) {
			res.send(err);
		} else {
			res.json(items);
		}
	});
});

//

const port = process.env.PORT || 3000;
const listener = app.listen(port, () => {
	console.log(`Ouvindo na porta ${listener.address().port}`);
});
