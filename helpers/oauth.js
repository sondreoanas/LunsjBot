require('dotenv').config();
var admin = require("firebase-admin");

var serviceAccount = require('../lunsjbotdb-firebase-adminsdk-pjlus-faa936b432.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lunsjbotdb.firebaseio.com"
});

let db = admin.firestore();

const oauthSuccess = ({ res, oAuthResult }) => {
    // save oAuthResult in to db
    const teamId = oAuthResult.team_id;
    let docRef = db.collection('OAuth').doc(teamId);

    let dataSet = {
        'userToken': oAuthResult.access_token,
        'botToken': oAuthResult.bot.bot_access_token,
        'botId': process.env.SLACK_APP_ID,
        'botUserId': oAuthResult.bot.bot_user_id
    };
    let dbRes = docRef.set(dataSet);
    
    // redirect to successfully installed thankyou page url
    res.redirect('http://www.example.com');
};

const oauthError = (error) => {
    // do something about that error to let the user know
    console.log('oauthError');
    console.log(error);
};

const oauthStateCheck = (oAuthState) => {
    // check the parameter state against your saved state to ensure everything is ok
    return true;
};

const  authorizeFn = (async ({ teamId, enterpriseId, userId, conversationId }) => {
    let token = {};
    // check db for token
    await db.collection('OAuth').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                if (doc.id == teamId) {
                    token = doc.data();
                }
            });
        });
    return token;
});

module.exports.oauthSuccess = oauthSuccess;
module.exports.oauthError = oauthError;
module.exports.oauthStateCheck = oauthStateCheck;
module.exports.authorizeFn = authorizeFn;