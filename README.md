[![Build Status](https://travis-ci.org/TheHatSky/asp-net-core-url-compiler.svg?branch=master)](https://travis-ci.org/TheHatSky/asp-net-core-url-compiler)
[![Code Climate](https://codeclimate.com/github/TheHatSky/asp-net-core-url-compiler/badges/gpa.svg)](https://codeclimate.com/github/TheHatSky/asp-net-core-url-compiler)
[![Test Coverage](https://codeclimate.com/github/TheHatSky/asp-net-core-url-compiler/badges/coverage.svg)](https://codeclimate.com/github/TheHatSky/asp-net-core-url-compiler/coverage)


[![Latest Stable Version](https://img.shields.io/npm/v/asp-net-core-url-compiler.svg)](https://www.npmjs.com/package/asp-net-core-url-compiler)
[![NPM Downloads](https://img.shields.io/npm/dt/asp-net-core-url-compiler.svg)](https://www.npmjs.com/package/asp-net-core-url-compiler)

# ASP.NET Core url compiler
A simple url compiler for asp.net core routes implemented on Typescript.

### Install
```shell
npm install --save asp-net-core-url-compiler
```

### Usage
```typescript
import { compileUrl } from 'asp-net-core-url-compiler';

const urlTemplateFromAspNetCoreServer = 'products/{category}?page={page:int}&limit={limit:int?}';

let url = compileUrl(urlTemplateFromAspNetCoreServer, {
    category: 'computers',
    page: 12,
    limit: 100
});
console.log(url);
// products/computers?page=12&limit=100

let url = compileUrl(urlTemplateFromAspNetCoreServer, {
    category: 'computers',
    limit: 100
});
// throws error
// Parameter 'page' missing.

let url = compileUrl(urlTemplateFromAspNetCoreServer, {
    category: 'computers',
	page: 4
});
console.log(url);
// products/computers?page=4&limit=

let url = compileUrl(urlTemplateFromAspNetCoreServer, {
    category: 'computers',
    page: "not today"
});
// throws error 
// Parameter 'page:int' doesn't match C# Int32. Value of type Int32 must be a number. Provided value: "not today"
```

### Supported
* Nullable route constaints like `{name?}`
* Simple type route constraint validation for `int`, `string`, `boolean` and `guid`

### Not supported yet
* The rest of [route constraints](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/routing#route-constraint-reference) (`long`, `decimal`, `required` and so on)
* [Token replacement](https://docs.microsoft.com/en-us/aspnet/core/mvc/controllers/routing#token-replacement-in-route-templates-controller-action-area)
in route templates ([controller], [action], [area])

### Build
```shell
tsc ts/asp-net-core-url-compiler.ts --outDir ./js/
```
