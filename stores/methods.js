/* eslint global-require: 0 */

const requestOptions = require('./options');
const priceParse = require('../modules/priceParse');
const terabyteParse = require('./terabyte/priceparse');

const request = require('request-promise');

const config = {
	kabum: require('./kabum/config'),
	terabyte: require('./terabyte/config'),
	pichau: require('./pichau/config'),
};

function StoreMethods() {}

function getName($, store) {
	return $(store.name).text().trim();
}

function getCurrentPrices($, store) {
	let regularPrice;
	const discountPrice = priceParse($(store.discountPrice).text().trim()).toString();

	if (store.vendor.name === 'TerabyteShop') {
		regularPrice = terabyteParse($(store.regularPrice).text().trim().toString());
	} else {
		regularPrice = priceParse($(store.regularPrice).text().trim()).toString();
	}

	const json = {
		regularPrice,
		discountPrice,
	};

	return json;
}

function getThumbnail($, store) {
	const element = $(store.thumbnail)[0];

	if (element) {
		return element.attribs.src;
	}

	const backup = $(config.backupThumbnail)[0];
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

function dailyCheckup(uri, item, store) {
	request(requestOptions(uri, store))
	.then(($) => {
		if (!$) {
			return 'error';
		}

		const prices = getCurrentPrices($);
		item.addDailyPrices(prices);

		return item;
	})
	.catch((error) => {
		console.error(error);

		return error;
	});
}

StoreMethods.prototype.getName = getName;
StoreMethods.prototype.getCurrentPrices = getCurrentPrices;
StoreMethods.prototype.getThumbnail = getThumbnail;
StoreMethods.prototype.newItem = newItem;
StoreMethods.prototype.dailyCheckup = dailyCheckup;

module.exports = exports = new StoreMethods();
