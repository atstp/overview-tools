![overview-tools](http://bl.ocks.org/atstp/raw/0a0c7c1a0eeb9ba7d578/banner.svg)

High level overviews are _awesome_; they make projects friendly in an
instant. _Explaining and displaying_ your project your project makes
it easy for users &amp; contributors to understand your project.

`overview-tools` is a simple `npm`-available module written in ES6
that makes it downright, super-darn, i-dare-say, quite easy to build a
friendly overview for your project.

-----

Add an `OVERVIEW` file to your project &mdash; alongside your
`README`, `CONTRIBUTING`, `LICENSE`, etc

    overview-tools/

        this is an example comment
        it's indented 4 spaces under it's parent

        comment away!

    overview-tools/bin/
    overview-tools/bin/overview-tools
    overview-tools/src/
    overview-tools/src/converters/
    overview-tools/src/converters/json-to-html.js
    ...cut for brevity...

this file is readable, maintainable, and straightforward as plain-text,
but it gets better:

add one line to your `package.json`

    ...
    "scripts": {
        "overview": "./node_modules/.bin/overview-tools ./OVERVIEW --to tree"
    },
    ...

now new users can `npm run overview`

![tree output](https://gist.githubusercontent.com/atstp/0a0c7c1a0eeb9ba7d578/raw/9d4cb63f4c3c070c8014c5c573a4ee71b7d1db3b/tree-output.png)

## use

there's a [cli](#cli) and [js modules](#modules) so you can use/extend it
to your taste.

### cli

building a boilerplate for your project (from a directory)

    overview-tools ./project-path/

fancy outputs (from a file)

    overview-tools ./project-path/OVERVIEW --to tree            # a clean utf8 tree
                                                tree.whitespace # just plain ol indents
                                                tree.basic      # instead of utf8 fanciness, just use ascii
                                                html            # html with a bunch of classes and ids
                                                overview        # the overview format
                                                markdown        # mmmmmm, mmmmarkdown
                                                json            # used internally, maybe kinda useful?

### modules

for functional fans

    import overviewFunctions as oFun from 'overview-tools';

    // going to json
    oFun.dirTreeToJSON(pathToDirectory)
    oFun.fileToJSON(pathToOverviewFile)
    oFun.overviewToJSON(overviewSourceText)

    // different output formats
    oFun.JSONToHTML(jsonDirectoryTree)
    oFun.JSONToOverview(jsonDirectoryTree)
    oFun.JSONToMarkdown(jsonDirectoryTree)
    oFun.JSONToTree(jsonDirectoryTree)

and for the OOP crowd

    import {Overview} from 'overview-tools';

    let myProj = new Overview(pathToOverviewFile);

    myProj.toOverview()
    myProj.toMarkdown()
    myProj.toHTML()
    myProj.toTree()
    myProj.toJSON()
