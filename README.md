# chrono-cli
Wrapper to make a cli out of [chrono-node](https://www.npmjs.com/package/chrono-node) with [stftime](https://www.npmjs.com/package/strftime)


## Install

    npm install -g chrono-cli
    
## Usage

```bash
    $ chrono parse <date...>
    
    Parse a natural language date string
    
    Options:
      --help          Show help                                            [boolean]
      --version       Show version number                                  [boolean]
      --timezone, -t  Timezone, e.g. -0700 for PDT or +0200 for AMS
      --format, -f    strftime format string (see 'man strftime')
```