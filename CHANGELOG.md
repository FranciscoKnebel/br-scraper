# Version Changelog

### 0.0.6
#### - Fix outdated config for balaodainformatica
Needed to change options in store config file.
Needed to updated price method for store.
New config doesn't have regularPrice store, so a function was added to simulate it.

### 0.0.5
#### - Kabum alternate promotion page pricing fix.
Page link was redirected to another page via a meta tag.
Due to that, we needed to find the new link and do another request,
with different selectors to find the promotion page prices.

#### - Terabyte check for NaN.
If a price element is not found via selectors, return NaN as the price.
Terabyte showed that when a product is no longer available, the price selectors will no longer exist,
so a default value and a check for the price elements was needed.
