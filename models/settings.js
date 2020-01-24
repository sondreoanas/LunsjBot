const lunsjComponent = require('./component');

function getRemoveOptionsBlocks(options) {
    return [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Pick an item from the dropdown list"
            },
            "accessory": {
                "type": "static_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select an item",
                    "emoji": true
                },
                "options": options,
                "action_id": "remove_option_act"
            }
        }
    ]
};

function removeOptionBlocks(options) {
    return getRemoveOptionsBlocks(lunsjComponent.getOptions(options));
}

module.exports.removeOptionBlocks = removeOptionBlocks;