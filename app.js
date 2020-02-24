require('dotenv').config();

const slash_helper = require('./helpers/command');
const oauth_helper = require('./helpers/oauth');
const Lunsj = require('./lunsj.js');

const { App } = require('@slack/bolt');
const Auth = require('bolt-oauth');

const app = new App({
    authorize: oauth_helper.authorizeFn,
    receiver: Auth({
        clientId: process.env.SLACK_CLIENT_ID,
        clientSecret: process.env.SLACK_CLIENT_SECRET,
        signingSecret: process.env.SLACK_SIGNING_SECRET,
        redirectUrl: process.env.SLACK_REDIRECT_URL,
        stateCheck: oauth_helper.oauthStateCheck,
        onSuccess: oauth_helper.oauthSuccess,
        onError: oauth_helper.oauthError
    })
});

const lunsj = new Lunsj();

app.command('/lunsj', async ({ack, payload, context}) => {
	ack();
	console.log('Called /lunsj');
	let command_list = payload.text.split(' ');
	const init_command = command_list.shift();
	const command_rest = command_list.join(' ');

	if (init_command == 'init' || init_command == 'ask') await slash_helper.ask(app, context.botToken, lunsj, command_rest);
	else if (init_command == 'settings') slash_helper.settings(app, context.botToken, payload.channel_id, lunsj, command_rest);
	else slash_helper.help(app, context.botToken, payload.channel_id);
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

app.action('remove_option_act', ({ body, ack, say }) => {
	ack();
	const removedOption = body.actions[0].selected_option.text.text;
	lunsj.removeOption(removedOption);
	say("Removed option: " + removedOption);
});

(async () => {
	await app.start(8080);
    console.log('⚡️ Bolt app is running!');
})();