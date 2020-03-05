require('dotenv').config();

const oAuthHelper = require('./helpers/oauth');
const command = require('./helpers/command');
const action = require('./helpers/action');
const lunsj = require('./modules/lunsj');

const { App } = require('@slack/bolt');
const Auth = require('bolt-oauth');

const app = new App({
    authorize: oAuthHelper.authorizeFn,
    receiver: Auth({
        clientId: process.env.SLACK_CLIENT_ID,
        clientSecret: process.env.SLACK_CLIENT_SECRET,
        signingSecret: process.env.SLACK_SIGNING_SECRET,
        redirectUrl: process.env.SLACK_REDIRECT_URL,
        stateCheck: oAuthHelper.oauthStateCheck,
        onSuccess: oAuthHelper.oauthSuccess,
        onError: oAuthHelper.oauthError
    })
});

app.command('/lunsj', (async ({ ack, payload, context }) => {
	ack();
	await command(app, payload, context);
}));
  
app.action('lunsj_select', ({ body, ack, say }) => {
	ack();
	action.lunsjSelect(lunsj, body, say);
});

app.action('remove_option_act', ({ body, ack, say }) => {
	ack();
	action.removeOption(lunsj, body, say);
});

(async () => {
	await app.start(8080);
	const teamId = await app.client.team.info();
	console.log(teamId);
	lunsj.init(teamId);
    console.log('⚡️ Bolt app is running!');
})();