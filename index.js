// partially inspired from AlessandroMinoccheri/package-info
var got = require('got')
var { getDepLength } = require('./utils')

module.exports = function(pckg, opts = ['name', 'version', 'description']) {
  // I'm nice like that
  if (typeof pckg === 'string') {
    pckg = { name: pckg }
  }
  if (pckg.name && typeof pckg.name !== 'string') {
    return Promise.reject(new Error('package name required'))
  }
  return got('https://registry.npmjs.org/' + pckg.name.toLowerCase())
    .then(function(data) {
      const dataParsed = JSON.parse(data.body)
      const name = dataParsed.name
      const version = pckg.version || dataParsed['dist-tags'].latest
      const latest = dataParsed['dist-tags'].latest
      const description = dataParsed.description
      const license = dataParsed.license
      let homepage = ''
      let author = ''

      // edge: when there is no version
      if (!dataParsed.versions[version]) {
        return { name: `${version} version of ${pckg.name} doesn't exist` }
      }

      const dependencies = getDepLength(dataParsed, version)
      const devDependencies = getDepLength(
        dataParsed,
        version,
        'devDependencies',
      )

      if (dataParsed.homepage !== undefined) {
        homepage = dataParsed.homepage
      }

      // get author and maintainers
      if (dataParsed.author && dataParsed.author.name) {
        // call it a day I have author
        author = dataParsed.author.name
      } else {
        if (Array.isArray(dataParsed.maintainers)) {
          // TODO: maybe make them unique
          author = dataParsed.maintainers
            .reduce((acc, { name }) => (name ? `${name} ${acc}` : acc), '')
            .trim()
        }
      }
      const allProps = {
        homepage,
        latest,
        name,
        description,
        version,
        author,
        license,
        devDependencies,
        dependencies,
      }

      const output = {}
      for (let option of opts) {
        let value = allProps[option]
        value && (output[option] = value)
      }
      return output
    })
    .catch(function(err) {
      // I don't want to throw because I need this info as well
      if (err.statusCode === 404) {
        return { name: `Package ${pckg.name} doesn't exist` }
      }
      throw err
    })
}
