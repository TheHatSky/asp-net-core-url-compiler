[![Build Status](https://travis-ci.org/TheHatSky/asp-net-core-url-compiler.svg?branch=master)](https://travis-ci.org/TheHatSky/asp-net-core-url-compiler)
[![Code Climate](https://codeclimate.com/github/TheHatSky/asp-net-core-url-compiler/badges/gpa.svg)](https://codeclimate.com/github/TheHatSky/asp-net-core-url-compiler)
[![Test Coverage](https://codeclimate.com/github/TheHatSky/asp-net-core-url-compiler/badges/coverage.svg)](https://codeclimate.com/github/TheHatSky/asp-net-core-url-compiler/coverage)

# ASP.NET Core url compiler
A simple url compiler for asp.net core routes implemented on Typescript.

### Install
```shell
npm install --save asp-net-core-url-compiler
```

### Usage
```typescript
import { compileUrl } from 'asp-net-core-url-compiler';

const urlTemplateFromAspNetCoreServer = 'products/{category}?page={page}&limit={limit}';
const url = compileUrl(urlTemplateFromAspNetCoreServer, {
    category: 'computers',
    page: 12,
    limit: 100
});
console.log(url); // prints "products/computers?page=12&limit=100"

compileUrl(urlTemplateFromAspNetCoreServer, {
    category: 'computers',
    limit: 100
}); // throws error "Parameter 'page' missing."
```

### Not supported yet
* [Route constraints](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/routing#route-constraint-reference) (constructions like "{id?}" or "{article:guid}")
* [Token replacement](https://docs.microsoft.com/en-us/aspnet/core/mvc/controllers/routing#token-replacement-in-route-templates-controller-action-area)
in route templates ([controller], [action], [area])

### Build
```shell
tsc ts/asp-net-core-url-compiler.ts --outDir ./js/
```
