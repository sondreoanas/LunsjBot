const { App } = require('@slack/bolt');

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

let lunsj_time = Date();
const lunsj_message = {
	blocks: [
		{
			type: "section",
			text: {
				type: "mrkdwn",
				text: "Når er du klar for lunsj? :clock1130:"
			},
			accessory: {
				type: "static_select",
				placeholder: {
					type: "plain_text",
					text: "Velg et tidspunkt",
					emoji: true
				},
				options: [
					{
						text: {
							type: "plain_text",
							text: "Nå!",
							emoji: true
						},
						value: "now"
					},
					{
						text: {
							type: "plain_text",
							text: "Om 2 min",
							emoji: true
						},
						value: "2min"
					},
					{
						text: {
							type: "plain_text",
							text: "Om 5 min",
							emoji: true
						},
						value: "5min"
					}
				]
            },
            action_id: "lunsj_select"
		}
	]
};

app.message('lunsj?', ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    say(lunsj_message);
});
  
app.action('lunsj_select', ({ body, ack, say }) => {
    // Acknowledge the action
    ack();
    say(`<@${body.user.id}> clicked the button`);
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