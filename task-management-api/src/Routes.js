const router = require("express").Router();
//
const listRoutes = require("./task-management/route.task-management");
const userRoutes = require("./user/UserRoute");
router.use("/list", listRoutes);
router.use("/user", userRoutes);

module.exports = router;
