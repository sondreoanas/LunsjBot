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

app.message('lunsj?', async ({ message, context }) => {
	console.log('lunsj?...');
	//const users = await helper.get_users(app, context.botToken);

	
});

app.message('snart lunsj', async ({ message, context }) => {
	console.log('snart lunsj...');
	//lunsj.schedualMessages(app, context.botToken);
	await lunsj.schedualMessages(app, context.botToken, 'now');
});

app.message('delete lunsj', async ({ message, context }) => {
	console.log('delete lunsj...');
});



app.command('/lunsj', ({command, ack, say}) => {
	ack();
	let command_text = command.text.split(' ');
	let init_command = command_text[0];
	let command_rest = command_text.shift();

	if (init_command == "ask") slash_helper.ask(app, command, command_rest);
	else if (init_command == "set") slash_helper.set(command_rest);
	else if (init_command == 'get') slash_helper.get(command_rest);
	else if (init_command == 'help') slash_helper.help(command_rest);
	else slash_helper(command_text);
});
  
app.action('lunsj_select', ({ body, ack, say }) => {
    // Acknowledge the action
	ack();
	let selected_option = body.actions[0].selected_option.value;
	console.log(selected_option);
	let selected_option_text = lunsjComponent.get_select(selected_option);
	console.log(selected_option_text);
    say(`<@${body.user.id}> er klar for lunsj ` + selected_option_text);
});

(async () => {
    await app.start(4390);
    console.log('⚡️ Bolt app is running!');
})();