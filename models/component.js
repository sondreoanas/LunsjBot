function get_message(options) {
	return [
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
	];
};

function getLunsjMessage(options) {
	let cur_options = []
	for (const key of Object.keys(options)) {
		cur_options.push({
			"text": {
				"type": "plain_text",
				"text": key,
				"emoji": true
			},
			"value": options[key].toString()
		});
	}
	return get_message(cur_options);
};

module.exports.getLunsjMessage = getLunsjMessage;