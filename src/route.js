import express from "express";
const {
  getHelmetData,
  getHelmetNum,
  getUpdatedTime,
} = require("../controller/helmet");

const router = express.Router();

router.get("/", (res, req) => {
  res.sendFile("index.html");
});

router.get("/getHelmetData", getHelmetData);
router.get("/getHelmetNum", getHelmetNum);
router.get("/getUpdatedTime", getUpdatedTime);

module.exports = router;
