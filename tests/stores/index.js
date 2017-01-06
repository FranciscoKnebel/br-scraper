/* eslint global-require: 0 */

const scraper = require('../../stores');

const stores = {
	kabum: require('./kabum'),
	terabyte: require('./terabyte'),
	pichau: require('./pichau'),
	balaodainformatica: require('./balaodainformatica'),
	americanas: require('./americanas'),
};

module.exports = (app) => {
	app.get('/test/:store/single', (req, res) => {
		const store = req.params.store;

		if (!stores[store]) {
			return res.send('Invalid name or store not yet supported.');
		}

		console.log(scraper);
		scraper.createItemFromStore(stores[store].uri, store).then(item => res.send(item));
	});

	app.get('/test/:store/single/callback', (req, res) => {
		const store = req.params.store;

		if (!stores[store]) {
			return res.send('Invalid name or store not supported.');
		}
		scraper.createItemFromStore(stores[store].uri, store, (error, item) => {
			if (error) {
				res.send(error);
			} else {
				res.send(item);
			}
		});
	});

	app.get('/test/:store/multiple', (req, res) => {
		const store = req.params.store;

		if (!stores[store]) {
			return res.send('Invalid name or store not supported.');
		}
		scraper.createMultipleItemsFromStore(stores[store].uris, store).then(items => res.send(items));
	});

	app.get('/test/:store/multiple/callback', (req, res) => {
		const store = req.params.store;

		if (!stores[store]) {
			return res.send('Invalid name or store not supported.');
		}
		scraper.createMultipleItemsFromStore(stores[store].uris, store, (error, items) => {
			if (error) {
				res.send(error);
			} else {
				res.send(items);
			}
		});
	});
};
