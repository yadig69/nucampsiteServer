const express = require("express");
const Promotions = require("../models/promotions");
const promotionsRouter = express.Router();
const authenticate = require("../authenticate");

promotionsRouter
  .route("/")
  .get((req, res, next) => {
    Promotions.find()
      .then((promotions) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.json(promotions);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotions.create(req.body)
      .then((promotion) => {
        console.log("Promotions Created ", promotion);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotion);
      })
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotion");
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Promotions.deleteMany()
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => next(err));
    }
  );
/////////////////////
promotionsRouter
  .route("/:promotionsId")
  .get((req, res, next) => {
    Promotions.findById(req.params.promotionsId)
      .then((promotion) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.json(promotion);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /promotion/${req.params.promotionsId}`
    );
  })
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotions.findByIdAndUpdate(
      req.params.promotionsId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((promotion) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotion);
      })
      .catch((err) => next(err));
  })

  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Promotions.findByIdAndDelete(req.params.promotionsId)
        .then((Promotions) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        })
        .catch((err) => next(err));
    }
  );
//////////////

module.exports = promotionsRouter;
