/* eslint no-param-reassign: 0 */

const request = require('request-promise');
const options = require('./options');
const isFunction = require('../modules/isFunction');

const kabum = require('./kabum');

function Stores() {}

function getHTML(uri) {
	return request(options(uri)); // then()
}

function createMultipleItemsFromStore(uris, store, callback) {
	const promise = Promise.all(uris.map(uri => getHTML(uri)))
		.then(bodies => bodies.map($ => this[store].newItem($)))
		.then(items => items.map((item, index) => {
			item.uri = uris[index];
			return item;
		}));

	if (callback && isFunction(callback)) {
		promise
			.then(items => callback(false, items))
			.catch(err => callback(err));
	} else {
		return promise;
	}
}

function createItemFromStore(uri, store, callback) {
	const promise = getHTML(uri)
		.then($ => this[store].newItem($))
		.then((item) => {
			item.uri = uri;
			return item;
		});

	if (callback && isFunction(callback)) {
		promise
			.then(item => callback(false, item))
			.catch(error => callback(error));
	} else {
		return promise;
	}
}

Stores.prototype.getHTML = getHTML;
Stores.prototype.createItemFromStore = createItemFromStore;
Stores.prototype.createMultipleItemsFromStore = createMultipleItemsFromStore;

// Stores
Stores.prototype.kabum = kabum;

module.exports = exports = new Stores();
