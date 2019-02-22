const got = require('got')
const pkginfo = require('../index')

const pkgname = 'axios'

test('returnes all custom properties requested', async () => {
  const axiosinfo = await pkginfo({ name: pkgname, version: '10.0.0' }, [
    'homepage',
    'latest',
    'name',
    'description',
    'version',
    'author',
    'license',
    'repository',
    'empty',
  ])
  expect(Object.keys(axiosinfo)).toHaveLength(8)
})

test('return sane msg if package name empty str', () => {
  // eslint-disable-next-line
  pkginfo('').catch(e => {
    expect(e.message).toBe('package name required')
  })
})

test('accept string and obj as first arg', async () => {
  const axiosinfo = await pkginfo(pkgname)
  expect(axiosinfo.name).toBe(pkgname)
})

test('given maintainers & author name prefer author name', async () => {
  const axiosinfo = await pkginfo(pkgname, ['author', 'name', 'description'])
  expect(axiosinfo.author).toBe('Joe Doe')
})

test('returns maintainers as string when no author name', async () => {
  const mockdata = {
    body: `{
      "dist-tags": {"latest": "10.0.0"},
      "maintainers": [ {"name": "Joe Doe"}, {"name": "jane"} ],
      "versions": { "10.0.0": { "name": "axios" } }
    }`,
  }

  got.mockImplementationOnce(() => Promise.resolve(mockdata))
  const axiosinfo = await pkginfo({ name: pkgname }, ['author'])
  expect(axiosinfo.author).toBe('jane Joe Doe')
})

test('if version provided provided uses specify version', async () => {
  const mockdata = {
    body: `{
      "dist-tags": {"latest": "10.0.0"},
      "versions": {"1.0.0": {"name": "axios"}}
    }`,
  }

  got.mockImplementationOnce(() => Promise.resolve(mockdata))
  const axiosinfo = await pkginfo({ name: pkgname, version: '1.0.0' }, [
    'version',
  ])
  expect(axiosinfo.version).toBe('1.0.0')
})

test('return null if no version', async () => {
  const mockdata = {
    body: `{
      "dist-tags": {"latest": "10.0.0"},
      "versions": {}
    }`,
  }

  got.mockImplementationOnce(() => Promise.resolve(mockdata))
  const axiosinfo = await pkginfo(pkgname)
  expect(axiosinfo).toBe(null)
})

test('return null if server returns 404', async () => {
  got.mockImplementationOnce(() => Promise.reject({ statusCode: 404 }))
  const axiosinfo = await pkginfo(pkgname)
  expect(axiosinfo).toBe(null)
})
