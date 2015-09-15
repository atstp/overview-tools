// './json-to-tree.js'
import {expect} from 'chai';
import {default as jsonToTree} from '../src/converters/json-to-tree';

var jsonTree = {
    name: "project-home",
    type: "directory",
    comments: "some crazzy comments on project home\nwith a newline",
    path: ["project-home"],
    children: [
        {
            name: "README.md",
            type: "file",
            comments: "comment on readme\nline 2 of comment on readme\nline 3 of comment on readme\n",
            path: ["project-home", "README.md"],
            children: [ ]
        },
        {
            name: "src",
            type: "directory",
            comments: "this is the src directory",
            path: ["project-home", "src"],
            children: [
                {
                    name: "main.js",
                    type: "file",
                    comments: "",
                    path: ["project-home", "src", "main.js"],
                    children: [ ]
                },
                {
                    name: "sibling.js",
                    type: "file",
                    comments: "main.js has no comments",
                    path: ["project-home", "src", "sibling.js"],
                    children: [ ]
                }
            ]
        }
    ]
}

var extendedOutput = `
project-home/
│    some crazzy comments on project home
│    with a newline
├── README.md
│        comment on readme
│        line 2 of comment on readme
│        line 3 of comment on readme
│
└── src/
    │    this is the src directory
    ├── main.js
    └── sibling.js
             main.js has no comments`;

var basicOutput = `
project-home/
|    some crazzy comments on project home
|    with a newline
|-- README.md
|        comment on readme
|        line 2 of comment on readme
|        line 3 of comment on readme
|
\`-- src/
    |    this is the src directory
    |-- main.js
    \`-- sibling.js
             main.js has no comments`;

var whitespaceOutput = `
project-home/
         # some crazzy comments on project home
         # with a newline
   README.md
         # comment on readme
         # line 2 of comment on readme
         # line 3 of comment on readme
         #
   src/
         # this is the src directory
      main.js
      sibling.js
            # main.js has no comments`;

describe('converting from json to an ascii tree', () => {
    it('should output utf8 tree by default', () => {
        var live = jsonToTree(jsonTree).trim()
                      .replace(/\x1B\[\d+m/g, '')
                      .replace(/\s+$/mg,'');
        var preset = extendedOutput.trim();
        expect(live).to.equal(preset);
    });
    it('should output utf8 tree when specified', () => {
        var live = jsonToTree(jsonTree, 'extended').trim()
                      .replace(/\x1B\[\d+m/g, '')
                      .replace(/\s+$/mg,'');
        var preset = extendedOutput.trim();
        expect(live).to.equal(preset);
    });
    it('should output ascii tree when specified', () => {
        var live = jsonToTree(jsonTree, 'basic').trim()
                      .replace(/\x1B\[\d+m/g, '')
                      .replace(/\s+$/mg,'');
        var preset = basicOutput.trim();
        expect(live).to.equal(preset);
    });
    it('should use whitespace when specified', () => {
        var live = jsonToTree(jsonTree, 'whitespace').trim()
                      .replace(/\x1B\[\d+m/g, '')
                      .replace(/\s+$/mg,'');
        var preset = whitespaceOutput.trim();
        expect(live).to.equal(preset);
    });
});

