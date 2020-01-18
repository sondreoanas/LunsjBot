const settingsBlocks = [
    {
        "type": "divider"
    },
    {
        "type": "section",
        "text": {
            "type": "plain_text",
            "text": "Change options for lunsjBot",
            "emoji": true
        }
    },
    {
        "type": "divider"
    },
    {
        "type": "actions",
        "elements": [
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Add option",
                    "emoji": true
                },
                "action_id": "add_option"
            },
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Remove option",
                    "emoji": true
                },
                "action_id": "remove_option"
            }
        ]
    }
];

const addOptionBlocks = [];
const removeOptionBlocks = []; 

module.exports.settingsBlocks = settingsBlocks;
module.exports.addOptionBlocks = addOptionBlocks;
module.exports.removeOptionBlocks = removeOptionBlocks;