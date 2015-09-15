const fragmentBlacklistedChars = /[#%^[]{}\"<>]+/g;

export default function(jsonTree, commentProcessor = stockCommentProcessor){

    var domComments = [];

    return '<div class="project-overview overview-tools-output">' +
                '<ul class="project-tree">'      + liForEntry(jsonTree) + '</ul>' +
                '<div class="project-comments">' + domComments.join('') + '</div>' +
           '</div>';

    function liForEntry(entry){
        var domEntry = [];

        domComments.push(commentProcessor(entry));

        domEntry.push('<li class="project-entry">') // open the LI
        domEntry.push('<a href="#' + fullPathFrag(entry) + '">' +
                           entry.name +
                      '</a>')

        if(entry.children){
            domEntry.push('<ul class="entry-children">') // open the UL
            for(let child of entry.children){
                domEntry.push(liForEntry(child));        // append children
            }
            domEntry.push('</ul>')                       // close the UL
        }

        domEntry.push('</li>') // close the LI

        if(domEntry.length){
            return domEntry.join('');
        } else {
            return '';
        }
    }
}

function fullPathFrag(entry){
    var fullPath = entry.path.join('/') + (entry.type === 'directory' ? '/' : '');
    return cleanFrag(fullPath);
}

function stockCommentProcessor(entry){
    var fullPath = entry.path.join('/') + (entry.type === 'directory' ? '/' : '');
    return  '<div id="' + fullPathFrag(entry) + '" class="entry-comment" >' +
                '<h3>' + fullPath + '</h3>' +
                '<p>' + entry.comments + '</p>' +
            '</div>';
}

function cleanFrag(dirty){
    var cleanedForFrag = dirty.replace(fragmentBlacklistedChars , '-').trim();
    return cleanedForFrag;
}
