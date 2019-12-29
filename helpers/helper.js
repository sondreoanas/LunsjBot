const puppeteer = require('puppeteer');

async function get_menu(day) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(process.env.LUNCH_URL, {"waitUntil" : "networkidle0"});

    const menus = await page.evaluate(() => {
        let result = [];
        const html_menus = document.querySelectorAll('.menu-item-landingpage');
        console.log(html_menus);
        html_menus.forEach(function (html_menu, i) {
            if (i == 5) return;
            const html_header = html_menu.querySelector('.menu-item__heading');
            const html_description = html_menu.querySelector('.menu-item__description');
            if (html_header != null && html_description != null) {
                result.push({
                    header: html_header.innerText,
                    description: html_description.innerText
                })
            }
        });
        return result;
    });

    switch (day) {
        case 'monday':
            return menus[0];
        case 'tuesday':
            return menus[1];
        case 'wednesday':
            return menus[2];
        case 'thursday':
            return menus[3];
        case 'friday':
            return menus[4];
        default:
            return menus;
    }
};

async function get_users (app, token) {
    const result = await app.client.users.list({ token: token });
    if (result.ok) {
        return result.members.filter(function (result) {
            return (result.id != 'USLACKBOT' && !result.is_bot);
        });//.map(function (result) {
        //     return result.id;
        // });
    } else {
        console.error(result);
        // throw error??
    }
};

async function get_user_channel_ids (app, token) {
    const users = await get_users(app, token);
    const user_channel_ids = [];
	for (user of users) {
		try {
			const id = await app.client.im.open({ token: context.botToken, user: user.id })
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

async function get_user (app, token, username) {
    const result = await app.client.users.list({
        token: token
    });
    return result.members.filter(function (result) {
        return (result.username == username);
    }).filter(function (result) {
        return result.id;
    });
}

module.exports.get_menu = get_menu;
module.exports.get_users = get_user_channel_ids;