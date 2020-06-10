makeconf
========

[![NPM version][npm-image]][npm-url]

**REQUIRES Node v4.0.0!**

*An interactive config generator that makes it easier to manage local
configuration files within a team.*

![makeconf][gif]

*makeconf* can be conveniently invoked from within the `postinstall` script
in your project's package.json file, prompting your buddies to review and update
their local config upon running `npm install`.

## Supported output formats

- `.env`
- `json`
- `module.exports` (the ubiquitous Node module object containing key-value pairs)

## Setup

```
$ npm install -g makeconf
```

## Usage

Create a `makeconf.json` file in your project directory:

```
{
  "format": ".env",
  "file": ".env",
  "config": {
    "S3": {
      "ACCESS_KEY": {
        "description": "Your Amazon S3 access key"
      },
      "SECRET": {
        "description": "Your Amazon S3 secret"
      }
    },
    "DEBUG": {
      "description": "Enable debug mode",
      "default": false,
      "required": true
    },
    "DATABASE": {
      "description": "Database driver",
      "required": true
    }
  }
}
```

Then generate your config file by running:

```
$ makeconf
```

## License

MIT © [Eric Nishio](http://ericnish.io)

[npm-url]: https://npmjs.org/package/makeconf
[npm-image]: https://img.shields.io/npm/v/makeconf.svg?style=flat-square
[gif]: /doc/demo.gif
