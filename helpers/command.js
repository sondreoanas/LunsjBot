 const settingsComponent = require('../models/settings');
 const generalComponent = require('../models/general');
 
 async function ask (app, token, lunsj, command) {
    if (command.trim() == 'all' || command == '') {
        await lunsj.postMessages(app, token);
    } else {
        await lunsj.postMessage(app, token, command);
    }
}

async function settings (app, token, channel, lunsj, command) {
    try {
        let postMessage = '';

        const command_array = command.split(' ');
	    const init_command = command_array.shift();
        const command_rest = command_array.join(' ').split('"');
        
        if (init_command == 'add') {
            const error_message = generalComponent.get_error_message('could not parse value, command usage: /lunsj settings add "(text)" (value)');
            if (command_rest.length > 2) {
                const text = command_rest[1];
                const value = parseInt(command_rest[2].trim());

                if (!isNaN(value)) {
                    lunsj.addOption(text, value);
                    postMessage = generalComponent.get_message('Added value ' + text);
                } else {
                    postMessage = error_message;
                }
            }
            else postMessage = error_message;
        }
        else if (init_command == 'remove') {
            postMessage = settingsComponent.removeOptionBlocks(lunsj.options);
        }

        await app.client.chat.postMessage({
            token: token,
            channel: channel,
            blocks: postMessage
        });
    }
    catch (error) {
        console.error(error);
    }
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

async function help(app, token, channel) {
    try {
        await app.client.chat.postMessage({
            token: token,
            channel: channel,
            blocks: generalComponent.get_help_message()
        });
    }
    catch (error) {
        console.error(error);
    }
}

module.exports.ask = ask;
module.exports.settings = settings;
module.exports.help = help;