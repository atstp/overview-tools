import {default as colors} from 'colors'

export default function(jsonTree, characterSet = 'extended'){
    jsonTree = [].concat(jsonTree); // "cast" to array
    var art = []; // this will get joined later; arrays are easier than strings
    var rootAdded = false;
    var nameColor = 'blue';
    var commentColor = 'gray';

    var format = {
        whitespace: {
            root: {
                prefix:            '',
                comment:           '         # ',
                future:            '',
                commentWhenParent: '         # ',
            },
            middleChild: {
                prefix:            '   ',
                comment:           '         # ',
                future:            '   ',
                commentWhenParent: '         # ',
            },
            lastChild: {
                prefix:            '   ',
                comment:           '         # ',
                future:            '   ',
                commentWhenParent: '         # ',
            }
        },
        basic: {
            root: {
                prefix:            '',
                comment:           '     ',
                future:            '',
                commentWhenParent: '|    ',
            },
            middleChild: {
                prefix:            '|-- ',
                comment:           '|        ',
                future:            '|   ',
                commentWhenParent: '|   |    ',
            },
            lastChild: {
                prefix:            '`-- ',
                comment:           '         ',
                future:            '    ',
                commentWhenParent: '    |    ',
            }
        },
        extended: {
            root: {
                prefix:            '',
                comment:           '    ',
                future:            '',
                commentWhenParent: '│    ',
            },
            middleChild: {
                prefix:            '├── ',
                comment:           '│        ',
                future:            '│   ',
                commentWhenParent: '│   │    ',
            },
            lastChild: {
                prefix:            '└── ',
                comment:           '         ',
                future:            '    ',
                commentWhenParent: '    │    ',
            }
        }
    }

    var fmt = format[characterSet];

    addToArt(jsonTree)

    return art.join('\n');

    function addToArt(entries, prePrefix = ''){
        for(let childNo in entries){
            let entry = entries[childNo];
            let name = entry.name + (entry.type === 'directory' ? '/' : '');
            let isLastChild = childNo == (entries.length - 1);
            let {prefix,
                 comment,
                 future,
                 commentWhenParent} = rootAdded ? (isLastChild ? fmt.lastChild : fmt.middleChild) : fmt.root;
            art.push(prePrefix + prefix + name[nameColor]);
            if(entry.comments){
                let comments = entry.comments.split(/\n/);
                let cmmt = (entry.children.length > 0) ? commentWhenParent : comment;
                for(let line of comments){
                    art.push(prePrefix + cmmt + line[commentColor]);
                }
            }
            rootAdded = true;
            if(entry.children){
                addToArt(entry.children,prePrefix + future);
            }
        }
    }
}

