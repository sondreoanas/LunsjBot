require('dotenv').config();
var admin = require("firebase-admin");

const staticOptions = {
    'now' : 0,
    '2 min' : 2,
    '5 min' : 5
};

class Admin {
    constructor() {
        let serviceAccount = require('../lunsjbotdb-firebase-adminsdk-pjlus-faa936b432.json');

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://lunsjbotdb.firebaseio.com"
        });

        this.db = admin.firestore();
    }
    
    async getOptions(teamId) {
        let settings = {};
        await this.db.collection('Settings').doc(teamId).get()
            .then((snapshot) => {
                settings = snapshot.data();
            });
            
        if (settings.Options) return settings.Options;
        else return staticOptions;
    }

    async addOption(teamId, optionName, optionValue) {
        let options = await this.getOptions(teamId);
        if (options == null) {
            options = staticOptions;
        }

        options[optionName] = optionValue;
        this.db.doc('Setttings').doc(teamId).doc('Options').set(options);
        return options;
    }

    async removeOption(teamId, optionName) {
        let options = await this.getOptions(teamId);
        if (options <= 1) throw Error('Cannot remove last option in list');

        delete options[optionName];
        this.db.doc('Setttings').doc(teamId).doc('Options').set(options);
        return options;
    }

    async getToken(teamId) {
        let token = {};
        await this.db.collection('OAuth').doc(teamId).get()
            .then((snapshot) => {
                token = snapshot.data();
            });
        return token;
    }

    setToken(teamId, oAuthResult) {
        let docRef = this.db.collection('OAuth').doc(teamId);

        let dataSet = {
            'userToken': oAuthResult.access_token,
            'botToken': oAuthResult.bot.bot_access_token,
            'botId': process.env.SLACK_APP_ID,
            'botUserId': oAuthResult.bot.bot_user_id
        };
        docRef.set(dataSet);
    }
}

module.exports = Admin;