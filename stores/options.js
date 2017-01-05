const cheerio = require('cheerio');

module.exports = (uri, store) => {
	const obj = {
		uri,
		transform: body => cheerio.load(body),
	};

	if (store === 'kabum') {
		obj.encoding = 'binary';
	}

	return obj;
};
