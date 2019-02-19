module.exports = {
  isValidPkgName: str =>
    typeof str === 'string' && str.length > 0 && str.length <= 214,
  // TODO: https://docs.npmjs.com/files/package.json#name
  // The name can’t start with a dot or an underscore
  // New packages must not have uppercase letters in the name.
  // can’t contain any non-URL-safe characters.
  getDepLength: (data, version, devDependencies) => {
    const depKey = devDependencies || 'dependencies'
    return Object.keys(data.versions[version][depKey] || []).length
  },
  // endpoint expects float or str 'latest'
  normalize: pckgName => {
    return pckgName
      .replace(/[~^]/g, '')
      .replace(/x/g, '0')
      .replace(/x/g, '0')
      .replace(/\*/g, 'latest')
  },
}
