# Uploading Files

1. Exercise: Uploading Files

Objective

Learn to use the Multer middleware library to set up an Express server to accept file uploads

Instructions

Install Multer
At the prompt in your nucampsiteServer project, type the following to install Multer:
npm install multer@1.4.2

Enable file uploading
Add a new Express router named uploadRouter.js in the routes folder and add the following code to it:
const express = require('express');
const authenticate = require('../authenticate');
const multer = require('multer');

const storage = multer.diskStorage({
destination: (req, file, cb) => {
cb(null, 'public/images');
},
filename: (req, file, cb) => {
cb(null, file.originalname)
}
});

const imageFileFilter = (req, file, cb) => {
if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
return cb(new Error('You can upload only image files!'), false);
}
cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});

const uploadRouter = express.Router();

uploadRouter.route('/')
.get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
res.statusCode = 403;
res.end('GET operation not supported on /imageUpload');
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req, res) => {
res.statusCode = 200;
res.setHeader('Content-Type', 'application/json');
res.json(req.file);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
res.statusCode = 403;
res.end('PUT operation not supported on /imageUpload');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
res.statusCode = 403;
res.end('DELETE operation not supported on /imageUpload');
});

module.exports = uploadRouter;

Then update app.js to import the uploadRouter and configure the new route as follows:
. . .
const uploadRouter = require('./routes/uploadRouter');

. . .

app.use('/imageUpload', uploadRouter);

. . .

Save all the changes and test your server.
Optional: Make a Git commit with the message "File Upload".

Summary

In this exercise, you learned to leverage the Multer middleware module to configure your Express server to enable file uploads.
