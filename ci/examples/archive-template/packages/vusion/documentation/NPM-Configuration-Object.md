https://docs.npmjs.com/cli/v6/using-npm/config

A "config" object can be used to set configuration parameters used in package scripts that persist across upgrades. For
instance, if a package had the following:

```json
{
    "name": "foo",
    "config": {
        "port": "8080"
    }
}
```

```js
http.createServer(...).listen(process.env.npm_package_config_port)
```

and then had a "start" command that then referenced the npm_package_config_port environment variable, then the user
could override that by doing npm config set foo:port 8001.

See config and scripts for more on package configs.