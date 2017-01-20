/* eslint no-param-reassign: 0 */

const request = require('request-promise-native');
const options = require('./options');
const isFunction = require('../modules/isFunction');
const methods = require('./methods');

function Stores() {}

function handleRedirect(content, store) {
	// 0;url=http://www.kabum.com.br/cgi-local/site/produtos/descricao_ofertas.cgi?codigo=80660
	return request(options(content.split('url=')[1], store));
}

function getHTML(uri, store) {
	return request(options(uri, store)).then(($) => {
		if (store === 'kabum') {
			const redirectContent = $('meta[http-equiv=refresh]').attr('content');
			if (redirectContent) {
				// console.log(`${store} meta redirecting from ${uri} to ${redirectContent}.`);
				return handleRedirect(redirectContent, uri, store);
			}
		}

		return $;
	});
}

function createMultipleItemsFromStore(uris, store, callback) {
	const promise = Promise.all(uris.map(uri => getHTML(uri, store)))
		.then(response => response.map(($, index) => methods.newItem($, uris[index], store)));

	if (callback && isFunction(callback)) {
		promise
			.then(items => callback(false, items))
			.catch(err => callback(err));
	} else {
		return promise;
	}
}

function createItemFromStore(uri, store, callback) {
	const promise = getHTML(uri, store)
		.then($ => methods.newItem($, uri, store));

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

Stores.prototype.methods = methods;

module.exports = exports = new Stores();
