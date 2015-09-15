import * as fs from 'fs';
import {default as jsonToHtml}     from './converters/json-to-html.js';
import {default as jsonToMarkdown} from './converters/json-to-markdown.js';
import {default as jsonToOverview} from './converters/json-to-overview.js';
import {default as jsonToTree}     from './converters/json-to-tree.js';
import {default as overviewToJson} from './converters/overview-to-json.js';
import {default as systemToJson}   from './converters/system-to-json.js';

const overviewFunctions = {
    JSONToHTML:     jsonToHtml,
    JSONToOverview: jsonToOverview,
    JSONToMarkdown: jsonToMarkdown,
    JSONToTree:     jsonToTree,
    overviewToJSON: overviewToJson,
    dirTreeToJSON:  systemToJson,
    fileToJSON:     path => {
        var contents = fs.readFileSync(overviewFile, {encoding: 'utf-8'});
        return overviewToJson(contents);
    }
};

class Overview {
    constructor(seed){

        // take an object at face value
        if (typeof seed === "object"){
            this.jsonTree = seed;

        // strings can be a few things
        } else if (typeof seed === "string"){

            // source text
            if(seed.match('\n')){
                this.jsonTree = overviewToJson(seed);

            // a path to...
            } else if (fs.existsSync(seed)){

                // a directory tree
                if (fs.lstatSync(seed).isDirectory()){
                    this.jsonTree = systemToJson(seed);

                // or a file
                } else if (fs.lstatSync(seed).isFile()){
                    var contents = fs.readFileSync(seed,{encoding:'utf-8'});
                    this.jsonTree = overviewToJson(contents);

                // otherwise let em know
                } else {
                    throw new Error('the overview constructor accepts a '+
                                    'path to only a file or directory');
                }
            } else {
                throw new Error('a string for the overview constructor' +
                                'must be a path or source text');
            }
        } else {
            throw new Error('invalid arguments to Overview constructor');
        }
    }

    toOverview(){
        return jsonToOverview(this.jsonTree);
    }

    toMarkdown(){
        return jsonToMarkdown(this.jsonTree, ...arguments);
    }

    toHTML(){
        return jsonToHtml(this.jsonTree);
    }

    toTree(){
        return jsonToTree(this.jsonTree, ...arguments);
    }

    toJSON(){
        return this.jsonTree;
    }
}


export {Overview as default,
        Overview as Overview,
        overviewFunctions};
