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

function get_welcome_message() {
	return [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Hi @Sondre! :wave: \n\n" + 
					"This is *Lunsj* :flag-no: (Lunch) bot\n" + 
					" It's an app that asks all your coworkers when they are ready for lunch and keeps track of the time\n\n" + 
					"Ask all your coworkers when they are ready for lunch by typing \n" + 
					"*/lunsj ask all* or */lunsj ask @username*"
			}
		}
	]
}

module.exports.get_error_message = get_error_message;
module.exports.get_message = get_message;