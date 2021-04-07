# Exercise: HTTPS and Secure Communication

--Objectives--

.Explore the use of the HTTPS core Node module to create and run a secure server.
.Generate a private key and public certificate and use them to configure the HTTPS server.
.Redirect traffic from the insecure HTTP server to a secure HTTPS server.

<h2>--Instructions--</h2>

--Generate a private key and self-signed certificate using OpenSSL--
.OpenSSL is typically installed by default on both MacOS and Windows. Enter 'which openssl' into your bash terminal to confirm that you have it installed.
.If you for some reason you do not, then for MacOS, you can install it using Homebrew with the command brew install openssl. For Windows, you can download an installer for Windows here - use the second installer on the list at that webpage (Win64 OpenSSL v1.1.1d, 43MB), the EXE version.
.In your bash terminal open to the nucampsiteServer/bin folder (the bin folder inside the nucampsiteServer), create the private key and certificate by typing the following at the prompt:
--openssl req -nodes -new -x509 -keyout server.key -out server.cert--
.You can press enter through the first 5 prompts. When asked to enter the Common Name, enter localhost. Enter your email address when asked.
.You should now see two new files in your nucampsiteServer/bin folder: server.key and server.cert.
.If you accidentally created these files outside of the bin folder, move them to that folder.
.If using Git, as a best practice, add your key and cert (bin/server.key and bin/server.cert) to your .gitignore file so that if you push to an online repository, they are not available to others.

--Configuring the HTTPS server--

.Open the www file in the bin directory and update its contents as follows:
. . .

const https = require('https');
const fs = require('fs');

. . .

app.set('secPort', port+443);

. . .

/\*\*

- Create HTTPS server.
  \*/

const options = {
key: fs.readFileSync(**dirname+'/server.key'),
cert: fs.readFileSync(**dirname+'/server.cert')
};

const secureServer = https.createServer(options, app);

/\*\*

- Listen on provided port, on all network interfaces.
  \*/

secureServer.listen(app.get('secPort'), () => {
console.log('Server listening on port', app.get('secPort'));
});
secureServer.on('error', onError);
secureServer.on('listening', onListening);

. . .
--Open app.js and add the following code to the file:--
. . .

// Secure traffic only
app.all('\*', (req, res, next) => {
if (req.secure) {
return next();
} else {
console.log(`Redirecting to: https://${req.hostname}:${app.get('secPort')}${req.url}`);
res.redirect(301, `https://${req.hostname}:${app.get('secPort')}${req.url}`);
}
});
. . .

.Make sure the mongodb server is running, then start the server (be sure you are in the nucampsiteServer directory and not the nucampsiteServer/bin directory).
.If you are using the Chrome browser, go to this URL: chrome://flags/#allow-insecure-localhost and enable the yellow-highlighted setting "Allow invalid certificates for resources loaded from localhost."
.Test in your browser by going first to https://localhost:3443.
.If you are using Firefox, you may get a browser warning page that lets you know that you are going to a site with an invalid certificate. Since this is your own site, you can select "Advanced" on this warning page then "accept the risks and continue". You should then be able to see your localhost site.
.Next, go to http://localhost:3000 and observe what happens. Be sure to type http instead of https this time.
.Optional: Commit your changes to your Git repository with the message "HTTPS".
Warning: Before you commit, as a best practice, first add your key and cert (bin/server.key and bin/server.cert) to your .gitignore file so that if you push to an online repository, they are not available to others.

--Summary--

In this exercise, you learned about configuring a secure HTTPS server in an Express application, and you also learned how to set up Express to redirect all requests to the HTTP server to the HTTPS server.
