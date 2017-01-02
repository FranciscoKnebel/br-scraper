module.exports = (price) => {
	const splitPrice = String(price).replace(/[R$.]/g, '').match(/-?[\d,.]+/);

	if (splitPrice == null) {
		return NaN;
	}

	return splitPrice;
};
