const cheerio = require('cheerio');

module.exports = (uri) => {
	const obj = {
		uri,
		transform: body => cheerio.load(body),
		encoding: 'binary',
	};

	return obj;
};
