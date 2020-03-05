function lunsjSelect (lunsj, body, say) {
    const user = body.user.id;
	const selectedOption = body.actions[0].selectedOption.value;
	const remainingObj = lunsj.addAnswer(user, selectedOption);
	if (remainingObj.user != '') {
		say('It\'s ' +  remainingObj.timeLeft + ` min left until lunch, waiting for <@${remainingObj.user}>`);
	} else {
		say('It\'s ' + remainingObj.timeLeft + ' min left until lunch!');
	}
}

async function removeOption (lunsj, body, say) {
    const removedOption = body.actions[0].selected_option.text.text;
	try {
		lunsj.removeOption(removedOption);
		say("Removed option: " + removedOption);
	} catch (err) {
		say(':no_entry: Error: ' + err)
	}
}

module.exports.lunsjSelect = lunsjSelect;
module.exports.removeOption = removeOption;