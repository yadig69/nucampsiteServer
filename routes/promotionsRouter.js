const express = require("express");
const promotionsRouter = express.Router();

promotionsRouter
  .route("/")
  .get((req, res, next) => {
    Promotions.find()
      .then((promotion) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        next();
        res.end("Will send all the promotions to you");
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    Promotions.create(req.body)
      .then((promotion) => {
        console.log("Promotions Created ", promotion);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotion);
        res.end(
          `Will add the promotion: ${req.body.name} with description: ${req.body.description}`
        );
      })
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotion");
  })
  .delete((req, res, next) => {
    Promotions.deleteManyBlur()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
        res.end("Deleting all promotion");
      })
      .catch((err) => next(err));
  });
/////////////////////
// promotionsId router
promotionsRouter
  .route("/:promotionsId")
  .get((req, res, next) => {
    Promotions.findById(req.params.promotionsId)
      .then((promotion) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        next();
        res.end(
          `Will send details of the promotion: ${req.params.promotionsId} to you`
        );
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /promotion/${req.params.promotionsId}`
    );
  })
  .put((req, res, next) => {
    Promotions.findByIdAndUpdate()
      .then((promotion) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotion);
        res.write(`Updating the promotion: ${req.params.promotionsId}\n`);
        res.end(
          `Will update the promotion: ${req.body.name} with description: ${rea.body.description}`
        );
      })
      .catch((err) => next(err));
  })

  .delete((req, res, next) => {
    Promotions.findByIdAndDelete(req.params.promotionsId)
      .then((Promotions) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
        res.end(`Deleting promotion: ${req.params.promotionsId}`);
      })
      .catch((err) => next(err));
  });
//////////////

module.exports = promotionsRouter;
