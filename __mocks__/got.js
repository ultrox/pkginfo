module.exports = () => {
  return Promise.resolve({
    body: `{
      "id": "axo", 
      "name": "axios",
      "description": "Hello",
      "dist-tags": {"latest": "10.0.0"},
      "author": {"name": "Joe Doe"},
      "versions": {
      "10.0.0": {
         "name": "axios",
         "author": {"name": "Joe Doe"},
         "maintainers": [{
         "name": "mzabriskie",
         "email": "mzabriskie@gmail.com"
        }]}
      }
    }`,
  })
}
