/* eslint no-param-reassign: 0 */

const request = require('request-promise');

const options = require('./options');
const kabum = require('./kabum');

function Stores() {}

function getHTML(uri) {
	return request(options(uri)); // then()
}

function createMultipleItemsFromStore(uris, store, callback) {
	Promise.all(uris.map(uri => getHTML(uri)))
		.then(bodies => bodies.map($ => this[store].newItem($)))
		.then(items => items.map((item, index) => {
			item.uri = uris[index];
			return item;
		}))
		.then(items => callback(false, items))
		.catch(err => callback(err));
}

function createItemFromStore(uri, store, callback) {
	getHTML(uri)
		.then($ => this[store].newItem($))
		.then((item) => {
			item.uri = uri;
			return item;
		})
		.then(item => callback(false, item))
		.catch(error => callback(error));
}

Stores.prototype.getHTML = getHTML;
Stores.prototype.createItemFromStore = createItemFromStore;
Stores.prototype.createMultipleItemsFromStore = createMultipleItemsFromStore;
Stores.prototype.kabum = kabum;

module.exports = exports = new Stores();
