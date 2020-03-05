const { WebClient } = require('@slack/web-api');

function getUsers(result, username) {
    if (result.ok) {
        return result.members.filter(function (result) {
            if (username) {
                return (result.username == username);
            }
            else {
                return (result.id != 'USLACKBOT' && !result.is_bot);
            }
        });//.map(function (result) {
        //     return result.id;
        // });
    } else {
        console.error(result);
        // throw error??
    }
};

async function getUserChannelIds(token, username) {
    const web = new WebClient(token);
    const userResult = await web.users.list({ token: token });
    const users = getUsers(userResult, username);
    
    const user_channel_ids = [];
	for (user of users) {
		try {
			const id = await app.client.im.open({ token: token, user: user.id })
			if (id.ok) {
				user_channel_ids.push( id.channel.id );
			} else {
				console.log('im.open for ' + user.id + 'returned ok: ' + id.ok);
			}
		}
		catch (exception) {
			console.log(exception);
			console.log(user);
		}
    }
    return user_channel_ids;
}

module.exports.getUsers = getUserChannelIds;