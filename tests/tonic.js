/* eslint import/no-unresolved: 0 */
/* eslint import/no-extraneous-dependencies: 0 */

'use strict';

const scraper = require('br-scraper');

const obj = {
	store: 'kabum',
	uri: 'http://www.kabum.com.br/produto/80660/placa-mae-asus-p-intel-lga-1151-matx-b150m-pro-ga',
};

scraper.createItemFromStore(obj.uri, obj.store).then(item => console.log(item));

scraper.createItemFromStore(obj.uri, obj.store, (error, item) => {
	if (error) {
		console.log(error);
	} else {
		console.log(item);
	}
});

const uris = [
	'http://www.kabum.com.br/produto/80660/placa-mae-asus-p-intel-lga-1151-matx-b150m-pro-ga-',
	'http://www.kabum.com.br/produto/59210/drive-lg-gravador-dvd-rw-24x-sata-preto-gh24nsc0',
	'http://www.kabum.com.br/produto/55934/cartucho-de-tinta-hp-662-preto-cz103ab',
];

scraper.createMultipleItemsFromStore(uris, 'kabum').then(items => console.log(items));

scraper.createMultipleItemsFromStore(uris, 'kabum', (error, items) => {
	if (error) {
		console.log(error);
	} else {
		console.log(items);
	}
});
