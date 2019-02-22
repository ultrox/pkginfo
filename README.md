# pkginfo
[![Build Status][build-badge]][build]
[![version][version-badge]][version]
[![MIT License][license-badge]][license]
[![semantic-release][semantic-badge]][semantic]
[![Renovate - Always up to date][renovateapp-svg]][renovateapp-link]
[![Code Coverage][coverage-badge]][coverage]

Flexible api to fetch npm package info

## Install

#### NPM

`npm install @ma.vu/pkginfo`

#### YARN

`yarn add @ma.vu/pkginfo`

## Usage

### `pkginfo <object|str>,[ options ] => Promise`

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
repository      => str
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

### Null for not finding package or/and version

Rationale for this is, if you query db and query can't yield the result, you
will get null, error will not be thrown. The same is for version

```javascript
info('not-existing-package-name').then(data => console.log(data))
/* 
   null
*/
```

#### Version does not exists
```javascript
info({name: 'react', version: '100.0.0'}).then(data => console.log(data))
/* 
   null
*/
```


[renovateapp-link]: https://renovatebot.com/dashboard#github/ultrox/pkginfo
[renovateapp-svg]: https://img.shields.io/badge/always-up_to_date-brightgreen.svg

[coverage-badge]: https://img.shields.io/codecov/c/github/ultrox/pkginfo.svg?style=flat-square
[coverage]: https://codecov.io/github/ultrox/pkginfo

[build-badge]: https://travis-ci.org/ultrox/pkginfo.svg?branch=master
[build]: https://travis-ci.org/ultrox/pkginfo

[version-badge]: https://img.shields.io/npm/v/@ma.vu/pkginfo.svg?style=flat-square
[version]: https://img.shields.io/npm/v/@ma.vu/pkginfo.svg?style=flat-square

[license-badge]: https://img.shields.io/npm/l/pkginfo.svg?style=flat-square
[license]: https://img.shields.io/npm/l/pkginfo.svg?style=flat-square

[semantic-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic]: https://github.com/semantic-release/semantic-release
