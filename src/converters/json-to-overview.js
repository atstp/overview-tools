//
// printTree( jsonRepresentation, type )
//
export default function(tree) {
    return buildString(tree);
}

function buildString(tree) {
    var preString = [];
    var comments = tree.comments.trim();

    preString.push( tree.path.join('/') + (tree.type==="directory"?'/':''));

    if(comments && comments.length){
        comments = comments.split(/\r?\n/)
                      .map(line => line.replace(/^/,'    '));
        preString = preString.concat(['', ...comments, '']);
    }
    if (tree.children) {
        for( let child of tree.children){
            preString.push(buildString(child));
        }
    }
    return preString.join('\n');
}
