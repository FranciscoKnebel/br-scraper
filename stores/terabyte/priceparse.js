module.exports = (price) => {
	const aux = price.split('x');

	const meses = parseInt(aux[0].replace(/[\D]/g, ''), 10);
	const parcela = parseFloat(aux[1].slice(aux[1].search(/[\d,]/g)).replace(/([,])/, '.'));

	return Math.round(meses * parcela).toFixed(2).replace(/([.])/, ',');
};
