remiera
=======

[![Greenkeeper badge](https://badges.greenkeeper.io/hideack/remiera.svg)](https://greenkeeper.io/)

remiera is node.js & redis based simple full-text search engine.

```
   _____  ___    ____ ___    (_)  ___    _____  ____ _
  / ___/ / _ \  / __ `__ \  / /  / _ \  / ___/ / __ `/
 / /    /  __/ / / / / / / / /  /  __/ / /    / /_/ /
/_/     \___/ /_/ /_/ /_/ /_/   \___/ /_/     \__,_/

  Usage: remiera [options] <params>

  Options:

    -h, --help                        output usage information
    -V, --version                     output the version number
    -s, --search [search word]        Search
    -i, --indexing [indexing target]  Indexing
```

### Indexing
- Building an Inverted Index with text file of the line.

```
$ remiera -i [file path]
```

### Search

```
$ remiera -s [query]
```

