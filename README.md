# kiosk

kiosk is a collection of tools for documenting project-structure.

your project structure is second nature to you, but it's foreign to everyone
who hasn't seen your project before. If you can get the idea easily across,
it'll help people get familiar with your project quickly.

## about

start with a file in the root directory of your repo named `OVERVIEW.kiosk`
([generate one](#generate))

    project-root/
        descriptions below the entry, indented four spaces, wrapping whenever
        you want for readability.

    project-root/src/
    project-root/src/main.js
        this file is at path "project-root/src/main.js", it's parent must
        be listed.

        whitespace will be preserved, so you can run it through a
        markdown processor like [markdown-js]

        [markdown-js]: https://github.com/evilstreak/markdown-js

    project-root/src/utils.js
        this would be describing the utils function.

this `OVERVIEW` file is is perfect for human consumption: it's _searchable,
readable, and maintainable_ so it can stand as a plain-text overview ripe for
human consumption. It also serves as the source for the rest of the documentation
tools.

## generator

    cd ~/path/to/your/project/
    babel-node kiosk-boiler >> OVERVIEW.kiosk

### outputs

you have a couple options for rendering `OVERVIEW.kiosk`:
[browser](#browser-output),
[ascii art](#ascii-output),
[tex](#tex-output).

#### browser output

[TODO: under construction] render an interactive interface

#### ascii-art output

[TODO: under construction] render an ascii-art drawing

#### tex output

[TODO: under construction] render latex code for the directory structure

<!--
## Use

   npm install babel-node browserify
-->
# Contributing

educators, maintainers, and first-time users: please consider contributing!

The goal of kiosk is to provide the _lowest possible barrier_ for new users
getting up to speed, and the _most convenient_ reference for long-term users.

overview-tools is written in ES6 &mdash;
try to keep your code as ES6-y as possible.

Anything that will help people learn, or make things more clear is quite welcome!
http://onsen.io/blog/mocha-chaijs-unit-test-coverage-es6/