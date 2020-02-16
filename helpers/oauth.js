const oauthSuccess = ({ res, oAuthResult }) => {
    // save oAuthResult in MongoDB or somewhere else permanent since it has all the tokens
      res.redirect('<successfully_installed_thankyou_page_url>');
};

const oauthError = (error) => {
    // do something about that error to let the user know
};

const oauthStateCheck = (oAuthState) => {
    // check the parameter state against your saved state to ensure everything is ok
    return true;
};

const authorizeFn = ({ teamId, enterpriseId, userId, conversationId }) => {
    // go to your MongoDB or wherever you've stored the tokens and get the values based on teamId and/or userId
    return '<your_tokens>';
};

module.exports.oauthSuccess = oauthSuccess;
module.exports.oauthError = oauthError;
module.exports.oauthStateCheck = oauthStateCheck;
module.exports.authorizeFn = authorizeFn;