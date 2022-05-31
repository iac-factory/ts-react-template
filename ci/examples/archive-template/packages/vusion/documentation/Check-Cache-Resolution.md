```js
// Import dependencies
import assert from "assert"
import { setup } from "axios-cache-adapter"

const api = setup({
  cache: {
    maxAge: 15 * 60 * 1000
  }
})

// Wrap code in an `async` function
async function exec () {
  // First request will be served from network
  const response = await api.get("http://some-rest.api/url")
    
  assert.ok(response.request.fromCache !== true)

  // Second request to same endpoint will be served from cache
  const anotherResponse = await api.get("http://some-rest.api/url")
    
  assert.ok(anotherResponse.request.fromCache === true)
}

exec()
```
