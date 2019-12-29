const helper = require('./helpers/helper');
const lunsjComponent = require('./models/component');

class Lunsj {
    constructor(time) {
        this.answers = [];
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
                let max_date = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
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
        if (this.answers.length > 0) {
            let timeLeft = 0;
            this.answers.forEach(answer => {
                if (answer > timeLeft) timeLeft = answer;
            });
            return timeLeft;
        }
        else return 0;
    }

    addAnswer(answer) {
        this.answers.push(answer);
    }

    async schedualMessages(app, token, time = this.time) {
        const users = await helper.get_users(app, token);
        if (time == 'now') {
            for (user of users) {
                await app.client.chat.postMessage({
                    token: token,
                    channel: user,
                    blocks: lunsjComponent.message.blocks
                });
            }
        } else {
            try {
                // Call the chat.scheduleMessage method with a token
                await app.client.chat.scheduleMessage({
                  token: token,
                  channel: message.channel.id,
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