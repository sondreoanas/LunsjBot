const helper = require('../helpers/helper');
const lunsjComponent = require('../models/component');
const Admin = require('./admin');

const admin = new Admin();

class Lunsj {
    async init(teamId) {
        this.answers = {};
        this.teamId = teamId;
        this.options = await admin.getOptions(this.teamId);
    }

    calculateLunsjTime() {
        const now = new Date();

        let user = '';
        let ticks_left = 0;

        for (const key of Object.keys(this.answers)) {

            let cur_date = new Date(this.answers[key].date);
            cur_date.setMinutes(cur_date.getMinutes() + this.answers[key].answer);

            let cur_time_left = cur_date - now;

            if (cur_time_left > ticks_left) {
                ticks_left = cur_time_left;
                user = key;
            }
        }
        const time_left = new Date(ticks_left);
        return { 'timeLeft' : time_left.getMinutes() + ':' + time_left.getSeconds() , 'user' : user }
    }

    addAnswer(user, answer) {
        this.answers[user] = { 
            'answer' : parseInt(answer),
            'date': new Date()
        };
        return this.calculateLunsjTime();
    }

    addOption(optionMessage, optionValue) {
        this.options = admin.addOption(this.teamId, optionMessage, optionValue);
    }

    removeOption(optionMessage) {
        this.options = admin.removeOption(this.teamId, optionMessage);
    }

    async getMessages(token, currentUser, username = '') {
        const users = await helper.getUsers(token, username.trim());
        let messages = [];
        for (user of users) {
            let lunsj_blocks = [];
            if (user == currentUser) lunsj_blocks = lunsjComponent.getLunsjMessage(this.options, null);
            else lunsj_blocks = lunsjComponent.getLunsjMessage(this.options, currentUser);

            messages.push({
                channel: user,
                blocks: lunsj_blocks
            });
        }
        return messages;
    }

    async postMessages(app, token, currentUser, usernames = '') {
        const users = await helper.get_users(app, token, usernames.trim());
        for (user of users) {
            let lunsj_blocks = [];
            if (user == currentUser) lunsj_blocks = lunsjComponent.getLunsjMessage(this.options, null);
            else lunsj_blocks = lunsjComponent.getLunsjMessage(this.options, currentUser);

            try {
                await app.client.chat.postMessage({
                    token: token,
                    channel: user,
                    blocks: lunsj_blocks
                });
            }
            catch (error) {
                console.error(error);
            }
        }
    }
}

module.exports = Lunsj;