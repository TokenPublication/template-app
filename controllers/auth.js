const axios = require('axios');
const remoteEndpoints = require('../config/remoteEndpoints');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
module.exports = {
    getAccessToken: async () => {
        
        // encode the client id and secret to get the base64 encoded string
        let encoded = Buffer.from(`${process.env.TEMPLATE_APP_CLIENT_ID}:${process.env.TEMPLATE_APP_CLIENT_SECRET}`).toString('base64');

        let res = await axios.post(remoteEndpoints.AUTH.GET_ACCESS_TOKEN, { 
            grant_type: 'client_credentials'
        }, {
            headers: {
                Authorization: `Basic ${encoded}`
            }
        });

        if(res.status === 200) {

            // set the access token in the global variable
            global.accessToken = res.data.access_token;
            global.expiresAt = res.data.expires_in + Date.now();

            return res.data.access_token;
        } else {
            console.log(res);
            return null;
        }    
    },
    login: async (req, res) => {
        
    }

};