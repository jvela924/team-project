# team-project


======================================================================
SPOTIFY WEB API - README SECTION
---------------------------------------------------------------------
Some Comments written by Aaron Neme | Majority of Instructions from https://developer.spotify.com/documentation/web-api/quick-start/
=====================================================================
This code is from https://github.com/spotify/web-api-auth-examples/blob/master/authorization_code/app.js and assists to perform in setting up routes and such for spotify api call. Much of the code is recognizable with the exception of variables and packages being different.
* Some of the code in Server.JS  and all of the code BELOW the Spotify Comment Line 'START SPOTIFY WEB API CODE' to the 'END SPOTIFY WEB API CODE' comment line is the main code for Spotify Web API. You will see that it contains code for....
1. Setting up the server (which we previous coded ourselves) on local machine and on Heroku (with the exception of all the spotify code that was written 8/17/2019)
2. Handling the user login request to Spotify
3. Specifying the scopes for which authorization is sought (which is the Spotify 'Authorizaion Flow' scope)
4. Performing the exchange of the authorization code for an access token
5. Calling the Web API Endpoint.
* This code utilizes the above 'CLIENT_ID', 'CLIENT_SECRET', and 'REDIRECT_URI' Environmental variables.

* The code in the Spotify Web API Section of 'server.js' contains three calls to the Spotify Accounts Service:
1. The first call is the service '/authorize' endpoint, passing to it our environmental variables. This is the call that starts the process of authenticating to the user and gets the user's authorization to acess data.
2. The second call is to the Spotify Accounts Service '/api/token' endpoint, passing to it t he authorization code returned by the first call and the client secret key. This call returns an access token and also a refresh token. After the first and second call are completed, the user has authorized the app for access, and the application will have the 'access_token' it needs to retrieve the user data from the Web API.
3. The third call, in the code managing requests to '/refresh_token', a refresh token is sent to '/api/token'. This will generate a new access token that we can issue when the previous has expired.
