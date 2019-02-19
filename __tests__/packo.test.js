const pkginfo = require('../index')

test('return sane msg if package name empty str', () => {
  pkginfo('').catch(e => {
    expect(e.message).toBe('package name required')
  })
})

test('accept string and obj as first arg', async () => {
  const pkgname = 'axios'
  const axiosinfo = await pkginfo(pkgname)
  const axiosObjInfo = await pkginfo({ name: pkgname })

  expect(axiosinfo.name).toBe(pkgname)
  expect(axiosObjInfo.name).toBe(pkgname)
})

test('given maintainers & author name prefer author name', async () => {
  const pkgname = 'runner'
  const axiosinfo = await pkginfo(pkgname, ['author', 'name', 'description'])
  expect(axiosinfo.author).toBe('Joe Doe')
})
// need to inject scenario
test.todo('returns maintainers as string when no author name')
test.todo('if version not provided uses latest as version')
test.todo('return null if 404')
test.todo("return null if can't find version")
