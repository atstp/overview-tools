import {expect} from 'chai';
import {default as converter} from '../src/converters/overview-to-json.js';

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
    `.trim().replace(/^    /mg,'');

var output = converter(overviewFile);

describe('converting from overview format to json', () => {

    it('should identify directories', () => {
        var root = output;
        expect(root.type).to.equal('directory');
    });

    it('should identify files', () => {
        var readme = output.children.filter( kid => { return kid.name === 'README.md' })[0];

        expect(readme.type).to.equal('file');
        expect().to.equal();
    });

    it('should append comments', () => {
        var expectedComment = [
                'this is a comment on demo-project',
                'it\'s a simple project that doesn\'t exist in real life'
            ].join('\n');

        expect(output.comments).to.equal(expectedComment);
    });

    it('should should split paths into array', () => {
        expect(output.children.length).to.equal(2);
    });

    it('should nest properly', () => {
        expect(output.children.length).to.equal(2);
    });
});
