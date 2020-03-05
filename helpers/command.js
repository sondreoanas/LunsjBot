const settingsComponent = require('../models/settings');
const generalComponent = require('../models/general');

async function command (app, payload, context) {
    
    let command_list = payload.text.split(' ');
    const init_command = command_list.shift();
    const command_rest = command_list.join(' ');

    let messages = [];
    if (init_command == 'init' || init_command == 'ask') {
        messages = await ask(context.botToken, command_rest, payload.user_id);
    } else if (init_command == 'settings') {
        messages = settings(app, context.botToken, payload.channel_id, lunsj, admin, command_rest);
    } else {
        messages = help(payload.channel_id);
    }

    for (const message of messages) {
        await app.client.chat.postMessage({
            token: context.botToken,
            channel: message.channel,
            blocks: message.blocks
        });
    }
}
 
 async function ask (lunsj, command, currentUser) {
    if (command.trim() == 'all' || command == '') {
        return await lunsj.getMessages(token, currentUser);
    } else {
        return await lunsj.getMessages(token, currentUser, command);
    }
}

//TODO: cleanup
async function settings (app, token, channel, lunsj, admin, command) {
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
                    lunsj.addOption(admin, text, value);
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


async function help(channel) {
    return [{
        channel: channel,
        blocks: generalComponent.getHelpMessage()
    }];
}

module.exports.command = command;