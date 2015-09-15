//'./system-to-json.js'
import {expect} from 'chai';
import * as util from 'util';
import {default as converter} from '../src/converters/system-to-json.js';

var projectSource = converter('./src/');

describe('building a json tree from the system', () => {

    it('should append a comment to the first entry', () => {
        expect(projectSource.comments).to.not.equal('');
    });

    it('should append children', () => {
        expect(projectSource.children.length).to.not.equal(0);
    });

    it('should split paths into correct length arrays', () => {
        expect(projectSource.path.length).to.equal(1);
        expect(projectSource.children[0].path.length).to.equal(2);
    });

});

