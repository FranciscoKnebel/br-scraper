module.exports = (promises) => {
	const resolvingPromises = promises.map(promise => new Promise((resolve) => {
		const payload = new Array(2);
		promise.then((result) => {
			payload[0] = result;
		})
				.catch((error) => {
					payload[1] = error;
				})
				.then(() => {
					/*
					 * The wrapped Promise returns an array:
					 * The first position in the array holds the result (if any)
					 * The second position in the array holds the error (if any)
					 */
					resolve(payload);
				});
	}));

	const errors = [];
	const results = [];

	// Execute all wrapped Promises
	return Promise.all(resolvingPromises)
		.then((items) => {
			items.forEach((payload) => {
				if (payload[1]) {
					errors.push(payload[1]);
				} else {
					results.push(payload[0]);
				}
			});

			return {
				errors,
				results,
			};
		}).then((items) => {
			const errors2 = items.errors.map(error => error.message).join(',');
			/*
			const results2 = items.results.join(',');

			console.log(`Executed all ${promises.length} Promises:`);
			console.log(`— ${items.results.length} Promises were successful: ${results2}`);
			console.log(`— ${items.errors.length} Promises failed: ${errors2}`);
			*/

			return {
				errors: errors2,
				results: items.results,
			};
		});
};
