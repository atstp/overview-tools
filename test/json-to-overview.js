import {expect} from 'chai';
import {default as converter} from '../src/converters/json-to-overview.js';

var jsonTree = {
        name: 'demo-project',
        type: 'directory',
        path: [ 'demo-project' ],
        comments: 'this is a comment on demo-project\n\nit\'s a simple project that doesn\'t exist in real life',
        children:
         [ { name: 'README.md',
             type: 'file',
             path: [ 'demo-project', 'README.md' ],
             comments: 'read this file before starting',
             children: [] },
           { name: 'src',
             type: 'directory',
             path: [ 'demo-project', 'src' ],
             comments: 'the source for the demo project',
             children:
              [ { name: 'main.file',
                  type: 'file',
                  path: [ 'demo-project', 'src', 'main.file' ],
                  comments: 'the main file is here, it does lots of "things"',
                  children: [] },
                { name: 'main-sibling.file',
                  type: 'file',
                  path: [ 'demo-project', 'src', 'main-sibling.file' ],
                  comments: '',
                  children: [] } ] } ] }

var overviewFile = `
    demo-project/

        this is a comment on demo-project

        it's a simple project that doesn't exist in real life

    demo-project/README.md

        read this file before starting

    demo-project/src/

        the source for the demo project

    demo-project/src/main.file

        the main file is here, it does lots of "things"

    demo-project/src/main-sibling.file
    `.trim().replace(/^ {4}/mg,'');

var output = converter(jsonTree)
                 .trim().replace(/ +$/mg,''); // get rid of trailing whitespace

describe('converting json to overview format', () => {

    it('should build a overview file', () => {
        expect(output).to.equal(overviewFile);
    });

});
