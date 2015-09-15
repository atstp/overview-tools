import 'babel-core/polyfill';

export default function(jsonTree, inline = false){

    var markdown = `\n${buildHeader(jsonTree, inline)}\n`

    if (!inline) {
        markdown += `\n${buildBody(jsonTree)}\n`;
    }

    return markdown;
}

function buildHeader(entry, inline, depth = 0){
    var lines = [];
    var indent = '  '.repeat(depth);

    if( inline || !entry.comments ){
        lines.push(`${indent}  * ${shortName(entry)}`);
    } else {
        lines.push(`${indent}  * ${nameAsMarkdownLink(entry)}`);
    }

    if (inline && entry.comments) {
        let comments = entry.comments.split(/\r?\n/);
        lines.push('');
        for( let line of comments){
            lines.push(`${indent}    > ${line}`);
        }
        lines.push('');
    }

    if (entry.children) {
        for(let child of entry.children){
            lines.push(buildHeader(child, inline, depth +1));
        }
    }

    return lines.join('\n');
}

function buildBody(entry){
    var lines = [];
    if (entry.comments.length){
        lines.push(`### ${longName(entry)}`)
        lines.push(`\n${entry.comments}\n`)
    }
    if (entry.children) {
        for(let child of entry.children){
            let content = buildBody(child);
            if (content.trim()) {
                lines.push(content);
            }
        }
    }
    return lines.join('\n');
}

function shortName(entry){
    return entry.name + (entry.type === 'directory' ? '/' : '');
}

function longName(entry){
    return entry.path.join('/') + (entry.type === 'directory' ? '/' : '');
}

function nameAsMarkdownLink(entry){
    var name = entry.name + (entry.type === 'directory' ? '/' : '');
    if (entry.comments){
        name = `[${name}](#${stringToId(longName(entry))})`;
    }
    return name;
}

function stringToId(headerString){
    return headerString
            .toLowerCase()
            .replace(/[^\w-]+/g, '')
            .trim();
}
