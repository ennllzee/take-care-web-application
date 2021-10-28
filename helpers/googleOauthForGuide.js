const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const CLIENT_ID_GUIDE = '907374215732-jc7l3sk84f05vlsf9e23ceo674ek0sbe.apps.googleusercontent.com'

const client = new OAuth2Client(CLIENT_ID_GUIDE);

module.exports = async function verify(Token) {
  const ticket = await client.verifyIdToken({
    idToken: Token,
    audience: CLIENT_ID_GUIDE,  // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  const Gmail = payload['email'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  return { userid, Gmail }
};