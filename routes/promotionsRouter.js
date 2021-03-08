const express = require("express");
const promotionsRouter = express.Router();

promotionsRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all the promotions to you");
  })
  .post((req, res) => {
    res.end(
      `Will add the promotion: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotions");
  })
  .delete((req, res) => {
    res.end("Deleting all promotions");
  });
// promotionsId router
promotionsRouter
  .route("/:promotionsId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(
      `Will send details of the promotions: ${req.params.promotionsId} to you`
    );
  })

  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /promotions/${req.params.promotionsId}`
    );
  })

  .put((req, res) => {
    res.write(`Updating the promotions: ${req.params.promotionsId}\n`);
    res.end(
      `Will update the promotions: ${req.body.name} with description: ${rea.body.description}`
    );
  })

  .delete((req, res) => {
    res.end(`Deleting promotions: ${req.params.promotionsId}`);
  });

module.exports = promotionsRouter;
