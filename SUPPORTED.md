# Supported Stores

- **Stores** are the supported stores.
- **Name** is the name you should reference in the scraper when you want to use that store.
- **Support** current stage of support for this store.
- **Updated** refers to the last direct change on the store configuration files.

| Store                                                         | Name           			| Support       	 | Updated  |
| ------------------------------------------------------------- |:-------------------:|:----------------:| --------:|
| [KaBuM!](http://www.kabum.com.br/)        										| kabum          			| Full         		 |    0.0.5 |
| [TerabyteShop](http://www.terabyteshop.com.br/)              	| terabyte       			| Full         		 |    0.0.5 |
| [Pichau](http://www.pichau.com.br/)	                  				| pichau         			| Full	           |    0.0.1 |
| [Balão da Informática](http://www.balaodainformatica.com.br/)	| balaodainformatica  | Outdated       	 |    0.0.1 |
| [Americanas](http://www.americanas.com.br/)	                  | americanas         	| Full	           |    0.0.1 |

### Support types:
- Planned
- Testing
- Partial
- Full
- Outdated

`*` [Balão da Informática](http://www.balaodainformatica.com.br/) uses JavaScript to obtain the regular product price, making it so that the price is not on the DOM at page load. Due to that, regularPrice is currently not supported, but discountPrice works as expected.
