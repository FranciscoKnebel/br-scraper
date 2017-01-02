const kabum = require('./config');
const requestOptions = require('../options');
const priceParse = require('../../modules/priceParse');

const cheerio = require('cheerio');
const request = require('request-promise');

// KaBuM!
// kabum.com.br
function Kabum() {}

function getName($) {
	return $(kabum.name).text().trim();
}

function getCurrentPrices($) {
	const regularPrice = priceParse($(kabum.regularPrice).text().trim()).toString();
	const discountPrice = priceParse($(kabum.discountPrice).text().trim()).toString();

	const json = {
		regularPrice,
		discountPrice,
	};

	return json;
}

function getThumbnail($) {
	const element = $(kabum.thumbnail)[0];

	if (element) {
		return element.attribs.src;
	}

	const backup = $(kabum.backupThumbnail)[0];
	if (backup) {
		return backup.attribs.src;
	}

	return null;
}

function newItem($, uri) {
	const name = getName($);
	const prices = getCurrentPrices($);
	const thumbnail = getThumbnail($);

	const item = {
		vendor: kabum.vendor.name,
		name,
		regularPrice: prices.regularPrice,
		discountPrice: prices.discountPrice,
		thumbnail,
		uri,
		created_at: new Date(),
	};

	return item;
}

function dailyCheckup(uri, item) {
	request(requestOptions(uri))
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

Kabum.prototype.getName = getName;
Kabum.prototype.getCurrentPrices = getCurrentPrices;
Kabum.prototype.getThumbnail = getThumbnail;
Kabum.prototype.newItem = newItem;
Kabum.prototype.dailyCheckup = dailyCheckup;

module.exports = exports = new Kabum();
