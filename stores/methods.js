/* eslint global-require: 0 */

const priceParse = require('../modules/priceParse');
const terabyteParse = require('./terabyte/priceparse');

const config = {
	kabum: require('./kabum/config'),
	terabyte: require('./terabyte/config'),
	pichau: require('./pichau/config'),
	balaodainformatica: require('./balaodainformatica/config'),
	americanas: require('./americanas/config'),
};

function StoreMethods() {}

function getName($, store) {
	if (store.vendor.name === 'Balão da Informática') {
		return $(store.name)[0].children[0].data.trim();
	}

	return $(store.name).text().trim();
}

function getCurrentPrices($, store) {
	let regularPrice = priceParse($(store.regularPrice).text().trim()).toString();
	const discountPrice = priceParse($(store.discountPrice).text().trim()).toString();

	if (store.vendor.name === 'TerabyteShop') {
		regularPrice = terabyteParse($(store.regularPrice).text().trim().toString());
	}

	const json = {
		regularPrice,
		discountPrice,
	};

	return json;
}

function getThumbnail($, store) {
	const element = $(store.thumbnail)[0];

	if (store.vendor.name === 'Balão da Informática') {
		return element.attribs['data-zoom-image'] || $(store.backupThumbnail)[0].attribs['data-zoom-image'];
	}

	if (element) {
		return element.attribs.src;
	}

	const backup = $(store.backupThumbnail)[0];
	if (backup) {
		return backup.attribs.src;
	}

	return null;
}

function newItem($, uri, store) {
	const name = getName($, config[store]);
	const prices = getCurrentPrices($, config[store]);
	const thumbnail = getThumbnail($, config[store]);

	const item = {
		vendor: config[store].vendor.name,
		name,
		regularPrice: prices.regularPrice,
		discountPrice: prices.discountPrice,
		thumbnail,
		uri,
		created_at: new Date(),
	};

	return item;
}

StoreMethods.prototype.getName = getName;
StoreMethods.prototype.getCurrentPrices = getCurrentPrices;
StoreMethods.prototype.getThumbnail = getThumbnail;
StoreMethods.prototype.newItem = newItem;

module.exports = exports = new StoreMethods();
