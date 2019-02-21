const defaultResponse = {
  body: `{
      "name": "axios",
      "description": "Hello",
      "dist-tags": {"latest": "10.0.0"},
      "author": {"name": "Joe Doe"},
      "maintainers": [{
        "name": "mzabriskie",
        "email": "mzabriskie@gmail.com"}],
      "versions": {
      "10.0.0": {
         "name": "axios",
         "author": {"name": "Joe Doe"}
        }
      }
    }`,
}

const got = jest.fn(() => Promise.resolve(defaultResponse))

module.exports = got
