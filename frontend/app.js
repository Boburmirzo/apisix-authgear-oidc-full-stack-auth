const express = require('express');
const axios = require('axios');
require('dotenv').config({path:'../.env'});
const app = express();

const config = {
  client: {
    id: process.env.AUTHGEAR_CLIENT_ID,
    secret: process.env.AUTHGEAR_CLIENT_SECRET,
    redirect_url: process.env.AUTHGEAR_REDIRECT_URI,
  },
  auth: {
    tokenHost: process.env.AUTHGEAR_ISSUER,
    tokenPath: '/oauth2/token',
    authorizePath: '/oauth2/authorize',
  },
};

app.get("/", async (req, res) => {

  if (req.query.code != null) {
    const data = {
      client_id: config.client.id,
      client_secret: config.client.secret,
      code: req.query.code,
      grant_type: 'authorization_code',
      response_type: 'code',
      redirect_uri: config.client.redirect_url,
      scope: "openid"
    };

    try {
      const getToken = await axios.post(`${config.auth.tokenHost}${config.auth.tokenPath}`, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      });

      const accessToken = getToken.data.access_token;

      const response = await axios.get("http://apisix:9080/protected", {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });

      res.send(response.data);

    } catch (error) {
      console.log(error);
      res.send("An error occoured! Login could not complete. Error data: " + error);
    }
  }

  else {
    res.redirect(`${config.auth.tokenHost}${config.auth.authorizePath}/?client_id=${config.client.id}&redirect_uri=${config.client.redirect_url}&response_type=code&scope=openid`);
  }
});

app.listen(3000, () => {
  console.log("server started!");
});

