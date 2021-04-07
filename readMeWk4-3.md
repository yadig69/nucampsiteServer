# Cross-Origin Resource Sharing

Objectives

Install and configure the cors Node module .
Update your Express application to support CORS on various endpoints.

Instructions

Install cors module
To install the cors module, type the following at the prompt:
npm install cors@2.8.5

Configure the server for CORS
In the routes folder, add a new file named cors.js and add the following code to it:
const cors = require('cors');

const whitelist = ['http://localhost:3000', 'https://localhost:3443'];
const corsOptionsDelegate = (req, callback) => {
let corsOptions;
console.log(req.header('Origin'));
if(whitelist.indexOf(req.header('Origin')) !== -1) {
corsOptions = { origin: true };
} else {
corsOptions = { origin: false };
}
callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
Then, open campsiteRouter.js and update it as follows:
. . .
const cors = require('./cors');
. . .

campsiteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
. . .
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
. . .
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
. . .
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

. . .

campsiteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
. . .
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
. . .
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
. . .
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
. . .

campsiteRouter.route('/:campsiteId/comments')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
. . .
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
. . .
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
. . .
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
. . .

campsiteRouter.route('/:campsiteId/comments/:commentId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
. . .
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
. . .
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
. . .
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {

. . .

Make similar updates to these routers: promotionRouter.js, partnerRouter.js, uploadRouter.js, and users.js. That is:
Import the cors module that you created to each.
Add a preflight request with the .options method to every route for promotionRouter.js, partnerRouter.js, and uploadRouter.js.
To all four files, add either the cors.cors middleware to the routing methods for GET requests, or the cors.corsWithOptions middleware to the routing methods for POST, PUSH, and DELETE requests. Exception: In users.js, all methods should use cors.corsWithOptions.
Test your server with Postman as instructed in the video.
Optional: Commit your changes to Git with the message "CORS".

Summary

In this exercise, you learned to configure your Express server to support cross-origin resource sharing by setting up two different middleware functions: first, the default cors method from the cors Node module, and second, a custom cors method configured with a whitelist. Then you updated the Express routers to respond to preflight messages from a client, as well as use the cors middleware to respond with the correct headers to cross-origin requests.
