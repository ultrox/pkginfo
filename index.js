// partially inspired from AlessandroMinoccheri/package-info
// TODO: <22-02-19> - Marko: replace got with 'isomorphic-unfetch'
const got = require('got')
const { getDepLength, isValidPkgName } = require('./utils')

module.exports = function pkginfo(
  pckg,
  opts = ['name', 'version', 'description'],
) {
  // I'm nice like that
  if (typeof pckg === 'string') {
    pckg = { name: pckg }
  }

  if (isValidPkgName(pckg.name)) {
    return got(`https://registry.npmjs.org/${pckg.name.toLowerCase()}`)
      .then(data => {
        const dataParsed = JSON.parse(data.body)
        const name = dataParsed.name
        const version = pckg.version || dataParsed['dist-tags'].latest
        const latest = dataParsed['dist-tags'].latest
        const description = dataParsed.description
        const license = dataParsed.license
        let homepage = ''
        let author = ''
        let repository = ''
        // edge: when there is no version
        if (!dataParsed.versions[version]) {
          return null
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

        if (dataParsed.repository !== undefined) {
          repository = dataParsed.repository.url
        }

        // get author and maintainers
        if (dataParsed.author && dataParsed.author.name) {
          // call it a day I have author
          author = dataParsed.author.name
        } else if (Array.isArray(dataParsed.maintainers)) {
          // TODO: maybe make them unique
          author = dataParsed.maintainers
            .reduce((acc, { name: n }) => (n ? `${n} ${acc}` : acc), '')
            .trim()
        } else {
          // is not neede, author is empty str
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
          repository,
        }

        const output = {}
        for (let option of opts) {
          let value = allProps[option]
          value && (output[option] = value)
        }
        return output
      })
      .catch(err => {
        if (err.statusCode === 404) {
          return null
        }
        throw err
      })
  } else {
    return Promise.reject(new Error('package name required'))
  }
}
