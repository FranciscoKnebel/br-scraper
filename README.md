# [![Flag](public/img/icons/brazil.gif)]() BR Scraper [![Flag](public/img/icons/brazil.gif)]()

[![NPM version](https://badge.fury.io/js/br-scraper.svg)](https://www.npmjs.com/package/br-scraper)
[![Build Status](https://travis-ci.org/FranciscoKnebel/br-scraper.svg?branch=master)](https://travis-ci.org/FranciscoKnebel/br-scraper)
[![NPM downloads](https://img.shields.io/npm/dt/br-scraper.svg?style=flat-square)](https://www.npmjs.com/package/br-scraper)
[![Issues](https://img.shields.io/github/issues-raw/FranciscoKnebel/br-scraper.svg?style=flat-square)](https://github.com/FranciscoKnebel/br-scraper/issues)

[![license](https://img.shields.io/badge/GitHub-Repository-green.svg?style=flat-square)](https://github.com/FranciscoKnebel/br-scraper/)
[![license](https://img.shields.io/github/license/FranciscoKnebel/br-scraper.svg?style=flat-square)](https://github.com/FranciscoKnebel/br-scraper/blob/master/LICENSE)

Brazilian electronic store web scrapping utility. Scrape the web with just a link and a store name!

For a list of the supported stores, check the [SUPPORTED.md](SUPPORTED.md) file.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

Install the package from npm:
```
npm install --save br-scraper
```

Include it in your project:

```
const scraper = require('br-scraper');
```

Now you can start querying products.

---

### Methods

All methods support both promises and callbacks, so it is up to user preference on which way to use.

#### createItemFromStore

createItemFromStore will generate a new item, containing the following items:

-	**vendor** *(the name of the store in which the query was done)*
-	**name** *(the name of the product according to the store)*
-	**regularPrice** *(the regular price of the item)*
-	**discountPrice** *(the discount price, normally from paying in full)*
-	**thumbnail** *(an image describing the product)*
-	**uri** *(the link passed to query this item)*
-	**created_at** *(a Date object, to describe when the item was created)*

Example usage:
```
const obj = {
	store: 'kabum',
	uri: 'http://www.kabum.com.br/produto/55934/cartucho-de-tinta-hp-662-preto-cz103ab',
};

scraper.createItemFromStore(obj.uri, obj.store).then(item => console.log(item));

scraper.createItemFromStore(obj.uri, obj.store, (error, item) => {
	if (error) {
		console.log(error);
	} else {
		console.log(item);
	}
}

```

Expected item response:
```
{
	"vendor": "KaBuM!",
	"name": "Cartucho de Tinta HP 662 Preto CZ103AB",
	"regularPrice": "32,82",
	"discountPrice": "27,90",
	"thumbnail": "http://static4.kabum.com.br/produtos/fotos/55934/55934_index_g.jpg",
	"uri": "http://www.kabum.com.br/produto/55934/cartucho-de-tinta-hp-662-preto-cz103ab",
	"created_at": "2017-01-06T03:48:20.211Z"
}
```

#### createMultipleItemsFromStore

createMultipleItemsFromStore functions similarly to createItemFromStore, but receives an array of URIs as the first parameter, so you can query multiple products from the same store.

```
const uris = [
	'http://www.kabum.com.br/produto/80660/placa-mae-asus-p-intel-lga-1151-matx-b150m-pro-ga-',
	'http://www.kabum.com.br/produto/59210/drive-lg-gravador-dvd-rw-24x-sata-preto-gh24nsc0',
	'http://www.kabum.com.br/produto/55934/cartucho-de-tinta-hp-662-preto-cz103ab',
];

scraper.createMultipleItemsFromStore(uris, 'kabum').then(items => console.log(items));

scraper.createMultipleItemsFromStore(uris, 'kabum', (error, items) => {
	if (error) {
		console.log(error);
	} else {
		console.log(items);
	}
});
```

#### getHTML
This is a function called by createItemFromStore and createMultipleItemsFromStore.
It returns a promise for your requested URI. Needed to do the manual updating methods.
Two parameters are needed, the first being the URI and the second being the store name.

```
const store = 'kabum';
const uri = 'http://www.kabum.com.br/produto/55934/cartucho-de-tinta-hp-662-preto-cz103ab';

const promise = scraper.getHTML(uri, store);

promise.then($ => scraper.methods.newItem($, uri, store))
		.then(item => console.log(item));

```

---

#### Manual updating
If you want, you can call the creation methods separately.
To call the manual functions, you need to call them from `scraper.methods`.

##### getName($, store)

Gets the name from a getHTML rendered page.

`$` is passed from getHTML and `store` is the chosen store name.

Returns the name of the product defined on the page.

```
const store = 'kabum';
const uri = 'http://www.kabum.com.br/produto/55934/cartucho-de-tinta-hp-662-preto-cz103ab';

const promise = scraper.getHTML(uri, store);

promise.then($ => scraper.methods.getName($, store))
		.then(name => console.log(name));

```

##### getCurrentPrices($, store)
Gets the current prices from a getHTML rendered page.

`$` is passed from getHTML and `store` is the chosen store name.

Returns an object containing two parameters:
```
{
	regularPrice,
	discountPrice,
}
```
Both prices are a comma separated price string.
If no value was found for the price, it will return NaN.

```
const store = 'kabum';
const uri = 'http://www.kabum.com.br/produto/55934/cartucho-de-tinta-hp-662-preto-cz103ab';

const promise = scraper.getHTML(uri, store);

promise.then($ => scraper.methods.getCurrentPrices($, store))
		.then(prices => console.log(prices));

```

##### getThumbnail($, store)

Gets the image thumbnail from a getHTML rendered page.

`$` is passed from getHTML and `store` is the chosen store name.

Returns the image link of the product defined on the page.

```
const store = 'kabum';
const uri = 'http://www.kabum.com.br/produto/55934/cartucho-de-tinta-hp-662-preto-cz103ab';

const promise = scraper.getHTML(uri, store);

promise.then($ => scraper.methods.getThumbnail($, store))
		.then(thumbnail => console.log(thumbnail));

```

##### newItem($, uri, store)

This is the item constructor function. It calls all the getter functions and returns a built item object.

`$` is passed from getHTML, `uri` is the link associated with item and `store` is the chosen store name.

Returns the new item object, as described on the `createItemFromStore` method.

```
const store = 'kabum';
const uri = 'http://www.kabum.com.br/produto/55934/cartucho-de-tinta-hp-662-preto-cz103ab';

const promise = scraper.getHTML(uri, store);

promise.then($ => scraper.methods.newItem($, uri, store))
		.then(item => console.log(item));

```

---
## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/FranciscoKnebel/br-scraper/tags).

## Authors

* [**Francisco Knebel**](https://github.com/FranciscoKnebel) - *Initial work*

See also the list of [contributors](https://github.com/FranciscoKnebel/br-scraper/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

---
[![forthebadge](http://forthebadge.com/images/badges/gluten-free.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com)

[![forthebadge](http://forthebadge.com/images/badges/powered-by-electricity.svg)](http://forthebadge.com)
