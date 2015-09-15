import * as fs from 'fs';
import * as pathModule from 'path';

//
// walkTree( pathToStartAt )
//
// walks the tree starting at pathToStartAt and returns
// a json representation of the directory structure
//
export default function(filename) {
    filename = pathModule.resolve(filename.replace(/\/$/,''));
    var jsonTree = walkTree(filename, pathModule.dirname(filename) + pathModule.sep);

    // add comments to the root entry
    jsonTree.comments = `
        this is an example comment
        it's indented 4 spaces under it's parent

        comment away!
        `.replace(/^ {8}/gm,'');

    return jsonTree;
}

function walkTree(filename, stripLeading) {
    var stats = fs.lstatSync(filename);
    var projPath = filename.replace(stripLeading,'');
    var entry = {
            path: projPath.split(pathModule.sep),
            name: pathModule.basename(filename),
            comments: ''
        };

    if (stats.isDirectory()) {
        entry.type = "directory";
        entry.children = fs.readdirSync(filename).map(function(child) {
            return walkTree(filename + '/' + child, stripLeading);
        });
    } else {
        entry.type = "file";
        entry.children = [];
    }

    return entry;
}

