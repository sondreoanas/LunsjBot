const options = [
	{
		"text": {
			"type": "plain_text",
			"text": "Nå!",
			"emoji": true
		},
		"value": "now"
	},
	{
		"text": {
			"type": "plain_text",
			"text": "Om 2 min",
			"emoji": true
		},
		"value": "2min"
	},
	{
		"text": {
			"type": "plain_text",
			"text": "Om 5 min",
			"emoji": true
		},
		"value": "5min"
	}
];

const message = {
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Når er du klar for lunsj? :clock1130:"
			},
			"accessory": {
				"type": "static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Velg et tidspunkt",
					"emoji": true
				},
				"options": options,
				"action_id": "lunsj_select"
            }
		}
	]
};

function get_select(select) {
	let result = '';
	options.forEach(option => {
		if (option.value == select) {
			console.log(option);
			result = option.text.text.toLowerCase();
			return;
		}
	});
	return result;
};

module.exports.message = message;
module.exports.get_select = get_select;