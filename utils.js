module.exports = {
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
