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

module.exports.get_error_message = get_error_message;
module.exports.get_message = get_message;