module.exports = (price) => {
	const splitPrice = String(price).replace(/[R$A-z]/g, '')
		.match(/-?[\d,.]+/)
		.toString()
		.replace(/[.]/, ',');

	if (splitPrice == null) {
		return NaN;
	}

	return splitPrice;
};
