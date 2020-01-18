const { App } = require('@slack/bolt');
const lunsjComponent = require('./models/component');
const helper = require('./helpers/helper');
const slash_helper = require('./helpers/command');
const Lunsj = require('./lunsj.js');

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

const lunsj = new Lunsj();

app.command('/lunsj', async ({ack, payload, context}) => {
	ack();
	let command_list = payload.text.split(' ');
	const init_command = command_list.shift();
	const command_rest = command_list.join(' ');

	if (init_command == 'init' || init_command == 'ask') await slash_helper.ask(app, context.botToken, lunsj, command_rest);
	else if (init_command == 'settings') slash_helper.settings(app, context.botToken, payload.channel_id);
	else if (init_command == 'set') slash_helper.set(command_rest);
	else if (init_command == 'get') slash_helper.get(command_rest);
	else if (init_command == 'help') slash_helper.help(command_rest);
	else slash_helper(command_text);
});
  
app.action('lunsj_select', ({ body, ack, say }) => {
    // Acknowledge the action
	ack();
	const user = body.user.id;
	const selected_option = body.actions[0].selected_option.value;
	const remainingObj = lunsj.addAnswer(user, selected_option);
	if (remainingObj.user != '') {
		say('Det er ' +  remainingObj.timeLeft + ` min igjen til lunsj, venter på <@${remainingObj.user}>`);
	} else {
		say('Det er ' + remainingObj.timeLeft + ' min igjen til lunsj!');
	}
});

app.action('add_option', ({ body, ack, say }) => {
	ack();
});

app.action('remove_option', ({ body, ack, say }) => {
	ack();
});

(async () => {
    await app.start(4390);
    console.log('⚡️ Bolt app is running!');
})();