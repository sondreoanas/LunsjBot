 async function ask (app, token, lunsj, command) {
    if (command.trim() == 'all' || command == '') {
        await lunsj.postMessages(app, token);
    } else {
        await lunsj.postMessage(app, token, command);
    }
}

function set(time) {
    // TODO: set time for lunsj
}

function get(command) {
    if (command[1] == 'menu') {
        helper.get_menu(text[2]).then(response => {
            say(text[2] +  ': ' + response.header + ' ' + response.description);
        });
    }
    else if (command[1] == 'time') {
        
    }
    //else throw "command not recognized"
    // TODO: get time for lunsj and menu
}

function help(command) {
    // TODO: set help for lunsj command
}

module.exports.ask = ask;
module.exports.set = set;
module.exports.get = get;
module.exports.help = help;