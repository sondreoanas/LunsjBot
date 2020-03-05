const Admin = require('../modules/admin');
const admin = new Admin();

const oauthSuccess = ({res, oAuthResult}) => {
    // save oAuthResult in to db
    const teamId = oAuthResult.team_id;
    admin.setToken(teamId, oAuthResult);

    // redirect to successfully installed thankyou page url
    res.redirect('http://www.example.com');
};

const oauthError = (error) => {
    // do something about that error to let the user know
    console.log(error);
};

const oauthStateCheck = (oAuthState) => {
    // check the parameter state
    return true;
};

const authorizeFn = ( async ({ teamId, enterpriseId, userId, conversationId }) => {
    // check db for token
    let token = await admin.getToken(teamId);

    if (token.userToken || token.botToken) return token;
    else throw new Error('No matching authorizations');
});

module.exports.oauthSuccess = oauthSuccess;
module.exports.oauthError = oauthError;
module.exports.oauthStateCheck = oauthStateCheck;
module.exports.authorizeFn = authorizeFn;