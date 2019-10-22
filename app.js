const { App } = require('@slack/bolt');
const lunsjComponent = require('./models/component');
const helper = require('./helper');

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message('lunsj?', ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    say(lunsjComponent.message);
});

app.command('/lunsj', ({command, ack, say}) => {
	ack();
	let text = command.text.split(' ');

	if (text[0] == "ask") {
		// TODO: ask whom for lunsj
	} else if (text[0] == "set") {
		// TODO: set time for lunsj
	} else if (text[0] == 'get') {
		if (text[1] == 'menu') {
			helper.get_menu(text[2]).then(response => {
				say(text[2] +  ': ' + response.header + ', ' + response.description);
			});
		}
		// TODO: get time for lunsj and menu
	} else if (text[0] == 'help') {
		// TODO: set help for lunsj command
	}
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
    // let ts = Date.now();

    // let date_ob = new Date(ts);
    // let date = date_ob.getDate();
    // let month = date_ob.getMonth() + 1;
    // let year = date_ob.getFullYear();
    
    console.log('⚡️ Bolt app is running!');
})();