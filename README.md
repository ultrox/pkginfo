[![Build Status](https://travis-ci.org/ultrox/pkginfo.svg?branch=master)](https://travis-ci.org/ultrox/pkginfo)
[![version](https://img.shields.io/npm/v/pkginfo.svg?style=flat-square)](http://npm.im/@ma.vu/pkginfo)
[![downloads](https://img.shields.io/npm/dm/pkginfo.svg?style=flat-square)](http://npm-stat.com/charts.html?package=pkginfo&from=2019-02-21)
[![MIT License](https://img.shields.io/npm/l/pkginfo.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

## Install


#### NPM
`npm install @ma.vu/pkginfo`

#### YARN
`yarn add @ma.vu/pkginfo`


## Usage

### `pkginfo <object|str>,[ arr ] => Promise`

Accepts name of package, returns name, version & description (default)

```javascript
const pkginfo = require('@ma.vu/pkginfo')

pkginfo('got').then(data => console.log(data))
/*
   {
     name: 'got',
     version: '9.6.0',
     'description: 'Simplified HTTP request
   }
*/
```

## Override Defaults

You are able to specify what you get in output. 

NOTE: It will completely override defaults

### Supported Properties

```
homepage        => str(url)
latest          => semver
name            => str
description     => str
version         => semver
author          => str || arr
license         => str
devDependencies => Int
dependencies    => Int
```


```javascript
const pkginfo = require('@ma.vu/pkginfo')

info('got', [
  'name',
  'description',
  'author',
  'dependencies',
  'devDependencies',
]).then(data => console.log(data))
/*
   {
     name: 'got',
     description: 'Simplified HTTP request
     author: 'sindresorhus',
     dependencies: 11,
     devDependencies: 16
   }
*/

```
### Require Exact version

It accepts object, and exact version of package you fetching, and now `version`
is your version you fetching, and `latest` is latest available version

```javascript
const pkginfo = require('@ma.vu/pkginfo')

info({ name: 'got', version: '3.0.0' }, [
  'name',
  'version',
  'latest',
  'dependencies',
  'devDependencies',
]).then(data => console.log(data))
/*
   {
     name: 'got',
     version: '3.0.0',
     latest: 9.6.0,
     dependencies: 10,
     devDependencies: 5
   }
*/
```
