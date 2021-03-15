const express = require("express");
const Partner = require("../models/partner");

const partnersRouter = express.Router();
partnersRouter
  .route("/")
  .get((req, res, next) => {
    Partner.find()
      .then((partners) => {
        res.end("Will send all the partners to you");
        res.setHeader("Content-Type", "application/json");
        res.json(partners);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Partner.create(req.body)
      .then((partner) => {
        res.end(
          `Will add the partner: ${req.body.name} with description: ${req.body.description}`
        );
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partner);
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /partners");
  })
  .delete((req, res) => {
    res.end("Deleting all partners");
  });
// partnersId router
partnersRouter
  .route("/:partnersId")
  .get((req, res) => {
    Partner.findById(req, params.partnersId)
      .then((partners) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        next();
        res.end(
          `Will send details of the partners: ${req.params.partnersId} to you`
        );
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /partners/${req.params.partnersId}`
    );
  })
  .put((req, res) => {
    Partner.findByIdAndUpdate(req.params.partnersId)
      .then((partners) => {
        res.write(`Updating the partners: ${req.params.partnersId}\n`);
        res.end(
          `Will update the partners: ${req.body.name} with description: ${rea.body.description}`
        );
      })
      .catch((err) => next(err));
  })

  .delete((req, res) => {
    Partners.findByIdAndDelete(req.params.partnersId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
        res.end(`Deleting partners: ${req.params.partnersId}`);
      })
      .catch((err) => next(err));
  });

//////////////
// must change for partnersRouter
// campsiteRouterId 2
partnersRouter
  .route("/:partnersId")
  .get((req, res, next) => {
    Partners.findById(req.params.partnersId)
      .then((partners) => {
        if (partners) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(partners);
        } else {
          err = new Error(`Partners ${req.params.partnersId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Partners.findById(req.params.partnersId)
      .then((partners) => {
        if (partners) {
          partners.push(req.body);
          partners
            .save()
            .then((partners) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(partners);
            })
            .catch((err) => next(err));
        } else {
          err = new Error(`Partners ${req.params.partnersId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(
      `PUT operation not supported on /partners/${req.params.partnersId}`
    );
  })
  .delete((req, res, next) => {
    Partners.findById(req.params.partnersId)
      .then((partners) => {
        if (partners) {
          for (let i = partners.length - 1; i >= 0; i--) {
            partners.id(partners).remove();
          }
          partners
            .save()
            .then((partners) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(partners);
            })
            .catch((err) => next(err));
        } else {
          err = new Error(`Partners ${req.params.partnersId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  });
///////////////
partnersRouter
  .route("/:partnersId")
  .get((req, res, next) => {
    Partners.findById(req.params.partnersId)
      .then((partners) => {
        if (partners && partners.id(req.params.partnersId)) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(partners.id(req.params.partnersId));
        } else if (!partners) {
          err = new Error(`Partners ${req.params.partnersId} not found`);
          err.status = 404;
          return next(err);
        } else {
          err = new Error(`partners ${req.params.partnersId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /partners/${req.params.partnersId}/${req.params.partnersId}`
    );
  })
  .put((req, res, next) => {
    Partners.findById(req.params.partnersId)
      .then((partners) => {
        if (partners && partners.id(req.params.partnersId)) {
          if (req.body.rating) {
            partners.id(req.params.partnersId).rating = req.body.rating;
          }
          if (req.body.text) {
            partners.id(req.params.partnersId).text = req.body.text;
          }
          partners
            .save()
            .then((partners) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(partners);
            })
            .catch((err) => next(err));
        } else if (!partners) {
          err = new Error(`Partners ${req.params.partnersId} not found`);
          err.status = 404;
          return next(err);
        } else {
          err = new Error(`partners ${req.params.partnersId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Partners.findById(req.params.partnersId)
      .then((partners) => {
        if (partners && partners.id(req.params.partnersId)) {
          partners.id(req.params.partnersId).remove();
          partners
            .save()
            .then((partners) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(partners);
            })
            .catch((err) => next(err));
        } else if (!partners) {
          err = new Error(`Partners ${req.params.partnersId} not found`);
          err.status = 404;
          return next(err);
        } else {
          err = new Error(`partners ${req.params.partnersId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  });

module.exports = partnersRouter;
