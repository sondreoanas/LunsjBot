function get_message(options, username) {
	let text = "";
	if (username) text = `<@${username}> wants to know when you are ready for lunch? :clock1130:`
	else text = "When are you ready for lunch? :clock1130:"
	return [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": text
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

function getOptions(options) {
	let cur_options = [];
	for (const key of Object.keys(options)) {
		cur_options.push({
			"text": {
				"type": "plain_text",
				"text": key,
				"emoji": true
			},
			"value": options[key].toString()
		});
	};
	return cur_options;
};

function getLunsjMessage(options, username) {
	return get_message(getOptions(options), username);
};

module.exports.getOptions = getOptions;
module.exports.getLunsjMessage = getLunsjMessage;