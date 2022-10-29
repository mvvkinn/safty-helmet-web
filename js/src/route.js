import express from "express";
const {
  userDashboard,
  getHelmetNum,
  getUpdatedTime,
} = require("../controller/helmet");
const { getFieldData } = require("../controller/field");
const { workerList } = require("../controller/worker");

const router = express.Router();

//main
router.get("/", getFieldData);

router.get("/workerList/:id", workerList);
router.get("/userDashboard/:id", userDashboard);

//APIs
router.get("/getHelmetNum", getHelmetNum);
router.get("/getUpdatedTime", getUpdatedTime);

module.exports = router;
