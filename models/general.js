function get_error_message(error_message) {
	return [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": ":no_entry: Error: " + error_message
			}
		}
	];
};

function get_message(message) {
    return [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": message
			}
		}
	];
}

function get_welcome_message(username) {
	return [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Hi" + (username ? `<@${username}>` : "") + "! :wave: \n\n" + 
					"This is *Lunsj* :flag-no: (Lunch) bot\n" + 
					" It's an app that asks all your coworkers when they are ready for lunch and keeps track of the time.\n\n" + 
					"Ask all your coworkers when they are ready for lunch by typing \n" + 
					"*/lunsj ask all* or */lunsj ask @username*"
			}
		}
	]
}

function get_helping_hand(username) {
	return [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Hi" + (username ? `<@${username}>` : "") + "! :wave: \n\n" +
					"I see you have started using *Lunsj bot*\n" +
					"Need more options to express yourself?\n\n" +
					"Add new options with:\n" +
					"*/lunsj settings add \"(displayed text)\" (amount of minutes)*\n" +
					"or remove existing ones with\n" +
					"*/lunjs settings remove*"
			}
		}
	]
}

function getHelpMessage() {
	return [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Lunsj bot usage :knife_fork_plate:"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Ask when people are ready for lunch:\n\n" +
				"`/lunsj ask all` to ask everyone\n" + 
				"`/lunsj ask @username` to ask a specific person\n\n" +
				"Not satisfied wifth the availible options?\n\n" +
				"`/lunsj settings add \"(option name)\" (option value in min)` to add a new value or\n" +
				"`/lunsj settings remove` to remove a value"
			}
		}
	]
}

module.exports.get_error_message = get_error_message;
module.exports.get_message = get_message;
module.exports.getHelpMessage = getHelpMessage;
module.exports.get_helping_hand = get_helping_hand;
module.exports.get_welcome_message = get_welcome_message;