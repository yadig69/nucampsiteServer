# OAuth and User Authentication

Objectives

Learn how to configure your server to support user authentication based on a third party OAuth provider.
Use Passport's OAuth support through the passport-facebook-token module to support OAuth-based authentication with Facebook for your users.

Exercise Resources
index.zip (contains index.html)

Instructions

Register your app on Facebook
Make sure you have logged into the account you wish to use on Facebook.
Go to https://developers.facebook.com/apps/
If you are redirected to https://developers.facebook.com, that means you will need to register your Facebook account as a developer.
Click the "Get Started" link at page upper right.
This will guide you through the developer registration process.
Once finished, you will be at the Apps page for developers.
Once at the Apps page:
Click the Create App button.
You'll be asked to choose an App Type. Choose "Build Connected Experiences".
Next, you will be asked to give an app name and to verify your email address. You can name the app "nucampsite" and verify that your email address is correct. You can leave the optional field regarding a Business Manager account as-is, which should be at the "No Business Manager Account selected" option.
Click Create App. Your app will then be given an App ID and App Secret. The App Secret can be accessed through Settings -> Basic. You can copy down your App ID and App Secret, or just remember you can access them here when needed.
In Settings -> Basic, add https://localhost:3443 to App Domains.
Scroll to the bottom and click the Add Platform button. Select "Website" then for the Site URL, add https://localhost:3443 once more. Click Save Changes.
Go to Settings -> Advanced and click on Yes to say Native/Desktop app, then Save Changes.

Configure index.html
Download the index.zip file provided above. Extract the index.html file from it and move it into the public folder, replacing the index.html file that's already there.
In the index.html file, replace where it says YOUR FACEBOOK APP ID with the Facebook App ID that you obtained for your application, inside the quotes.

Install passport-facebook-token module
In the nucampsiteServer folder, install the passport-facebook-token module by typing the following at the prompt:
npm i passport-facebook-token@4.0.0

Update config.js
Update config.js with the App ID and App Secret that you obtained earlier as follows:
module.exports = {
'secretKey': '12345-67890-09876-54321',
'mongoUrl': 'mongodb://localhost:27017/nucampsite',
'facebook': {
clientId: 'YOUR FACEBOOK APP ID HERE',
clientSecret: 'YOUR FACEBOOK APP SECRET HERE'
}
}
If you are using Git, add config.js to your .gitignore file so that you do not inadvertently push it to a public repository. That means you need to open your .gitignore file, then add a line that says:
config.js
The next time you add and commit to your git repository, the .gitignore file should prevent the update to your config.js file from being added, so that your App Secret remains secret. If you then git push to your online repository, be sure to confirm that the config.js file with the App Secret was not published. This is best practice so that your App Secret is not made public. You can read Facebook's warning against this here.

Update user model
Open user.js in the models folder and update the userSchema as follows:
const userSchema = new Schema({
. . .

    facebookId: String,

. . .
});

Set up Facebook authentication strategy
Open authenticate.js and add in the following line to add Facebook strategy:
. . .

const FacebookTokenStrategy = require('passport-facebook-token');

. . .

exports.facebookPassport = passport.use(
new FacebookTokenStrategy(
{
clientID: config.facebook.clientId,
clientSecret: config.facebook.clientSecret
},
(accessToken, refreshToken, profile, done) => {
User.findOne({facebookId: profile.id}, (err, user) => {
if (err) {
return done(err, false);
}
if (!err && user) {
return done(null, user);
} else {
user = new User({ username: profile.displayName });
user.facebookId = profile.id;
user.firstname = profile.name.givenName;
user.lastname = profile.name.familyName;
user.save((err, user) => {
if (err) {
return done(err, false);
} else {
return done(null, user);
}
});
}
});
}
)
);

Update users.js
Open users.js and add the following code to it:
. . .

router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
if (req.user) {
const token = authenticate.getToken({\_id: req.user.\_id});
res.statusCode = 200;
res.setHeader('Content-Type', 'application/json');
res.json({success: true, token: token, status: 'You are successfully logged in!'});
}
});
. . .

Test
Start your server and test your application.
In a browser, open https://localhost:3443/ to open the index.html file. (You may need to go to the index.html file explicitly: https://localhost:3443/index.html). Then click on the Facebook Login button to log into Facebook. At the end of the login process, open your browser's JavaScript console and then obtain the Access Token from there.
Then you can use the access token to contact the server at https://localhost:3443/users/facebook/token and pass in the token using the Authorization header with the value as Bearer to obtain the JWT token from the server.
You can also try two other ways to trade the access token from Facebook with a JWT token from the Express server, detailed in the testing section of the video for this lesson.
Also try using the Mongo REPL shell to verify that an account has been created with a FacebookId in the user collection of the nucampsite database.
Optional: Save all the changes and make a Git commit with the message "Passport Facebook".
NOTE: If you are pushing this Git repository to an online repository such as GitHub, take steps to conceal your App Secret so that it is not available publicly. To do this, add config.js to your .gitignore file before you add and commit the updates from this exercise.

An alternate strategy, if you want to be able to commit the config.js file without the App Secret, is to create a new file that exports a const variable holding the App Secret, add that new file to .gitignore, and use the variable imported from that file in config.js.

Summary

In this exercise, you learned about registering your application with Facebook for an App ID and App Secret, then using them to configure your server so that users can obtain an access token from Facebook using your App ID, then pass the access token to your server.
Then, you used the access token to contact the Facebook OAuth 2 server and gain access through it to the user resource (account), with which you allowed the user to access your server by issuing them a JSON Web Token.
