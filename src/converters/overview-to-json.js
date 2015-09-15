export default function (source){

    source = source.replace(/^\s+/);    // for collecting entries
    var tree = null;                    // for collecting entries

    // map the source code (split on newlines) to a new array as objects
    var entries = source.split(/\n\r?(?=\w)/).map((line) => {
        // remove everything past the first newline
        var longName = line.trim().replace(/\n[\s\S]*$/,'').trim();
        var type = longName.match(/\/$/) ? 'directory' : 'file';
        var path = longName.replace(/\/$/,'').split('/');
        var name = path[path.length - 1];
        var comments = line.replace(/^[^\s]+ */, '').trim() // remove the entry line
                           .replace(/^\n/, '')              // the preceeding newline
                           .replace(/^ {4}/gm, '');         // pull off the overview indents
        return {
            name: name,
            type: type,
            path: path,
            comments: comments ? comments : '',
            children: []
        };
    });

    for(let entry of entries){
        addEntryToTree(entry);
    }

    return tree;

    function addEntryToTree(newEntry){
        var cursor = tree;
        var depth = 1;
        if(!tree && newEntry.path.length === 1) { // if it's the first entry
            tree = newEntry;
            return;
        }
        while(depth < newEntry.path.length - 1){
            cursor = (cursor.children.filter((el,index) => {
                return el.name === newEntry.path[depth];
            }))[0];
            depth++;
        }
        cursor.children.push(newEntry);
    }
}
