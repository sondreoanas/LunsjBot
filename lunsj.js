const helper = require('./helpers/helper');
const lunsjComponent = require('./models/component');

class Lunsj {
    constructor(time) {
        this.answers = {};

        this.options = {
            'now' : 0,
            '2 min' : 2,
            '5 min' : 5
        };

        if (time) {
            this.time = time;
        } else {
            let now = new Date();
            let lunch_time = new Date();
            
            // Check if now is past 11:30
            let set_next_day = false;
            if (now.getHours() > 11) set_next_day = true;
            else if (now.getHours() == 11 && now.getMinutes() > 30) set_next_day = true;
            
            if (set_next_day) {
                // TODO: Add check for holidays
                // Check if next day is Weekend
                let added_days = 1;
                if (now.getDay() >= 5) {
                    if (now.getDay() == 5) added_days = 3;
                    else added_days = 2;
                }

                // TODO: Add check for year
                let max_day = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                let max_date = max_day.getDate();
                let date = now.getDate() + added_days;
                
                if (date > max_date) {
                    date -= max_date;
                    lunch_time.setMonth(now.getMonth() + 1, date);
                }
                else lunch_time.setDate(date);
            }

            lunch_time.setHours(11,30);
            this.time = lunch_time.getTime();
        }
        
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

    async postMessages(app, token, usernames = '') {
        const users = await helper.get_users(app, token, usernames.trim());
        const lunsj_blocks = lunsjComponent.getLunsjMessage(this.options);
        for (user of users) {
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

    async schedualMessages(app, token, time = this.time) {
        const users = await helper.get_users(app, token);
        
        for (user of users) {
            try {
                await app.client.chat.scheduleMessage({
                    token: token,
                    channel: user,
                    post_at: time,
                    blocks: lunsjComponent.message.blocks
                });
            }
            catch (error) {
                console.error(error);
            }
        }
    }
}

module.exports = Lunsj;