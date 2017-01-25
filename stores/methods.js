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
	if (store === 'balaodainformatica') {
		return $(config[store].name)[0].children[0].data.trim();
	}

	return $(config[store].name).text().trim();
}

function getCurrentPrices($, store) {
	const rp = $(config[store].regularPrice);
	const dp = $(config[store].discountPrice);

	let regularPrice;
	let discountPrice;

	// regularPrice
	if (rp.length < 1) {
		regularPrice = NaN;
	} else if (store === 'terabyte') {
		regularPrice = terabyteParse(rp.text().trim().toString());
	} else {
		regularPrice = priceParse(rp.text().trim()).toString();
	}

	if (Number.isNaN(regularPrice)) {
		if (store === 'kabum') {
			regularPrice = priceParse($(config[store].alternate.regularPrice).text().trim()).toString();
		}
	}

	// discountPrice
	if (dp.length < 1) {
		discountPrice = NaN;
	} else {
		discountPrice = priceParse(dp.text().trim()).toString();
	}

	if (Number.isNaN(discountPrice)) {
		if (store === 'kabum') {
			discountPrice = priceParse($(config[store].alternate.discountPrice).text().trim()).toString();
		} else if (store === 'balaodainformatica') {
			console.log(regularPrice);
			const aux = (regularPrice.replace(/[R$,]/g, '.') * (1 - config[store].discountPercent)).toFixed(2);
			discountPrice = priceParse(aux).toString();
		}
	}

	const json = {
		regularPrice,
		discountPrice,
	};

	return json;
}

function getThumbnail($, store) {
	const element = $(config[store].thumbnail)[0];

	if (store === 'balaodainformatica') {
		return element.attribs['data-zoom-image'] || $(config[store].backupThumbnail)[0].attribs['data-zoom-image'];
	}

	if (element) {
		return element.attribs.src;
	}

	const backup = $(config[store].backupThumbnail)[0];
	if (backup) {
		return backup.attribs.src;
	}

	return null;
}

function newItem($, uri, store) {
	const name = getName($, store);
	const prices = getCurrentPrices($, store);
	const thumbnail = getThumbnail($, store);

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
