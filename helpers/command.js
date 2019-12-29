 async function ask (app, command) { 
	// TODO: ask whom for lunsj
    const users = [];
    console.log('fetching users');
    if (text.length > 1 && text[1] != 'all') {
        users = await helper.get_user(app, command.token, text[1]);
    } else {
        users = await helper.get_users(app, command.token);
    }
    console.log(users);
    for (user of users) {
        await app.client.chat.postMessage({
            token: command.token,
            channel: user,
            blocks: lunsjComponent.message.blocks
        });
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