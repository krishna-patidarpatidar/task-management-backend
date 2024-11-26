const authenticateToken = require("../AuthHelper");
const listController = require("./controller.task-management");
const router = require("express").Router();
router.post("/addlist", authenticateToken, listController.createList);
router.get("/getAllList", authenticateToken, listController.getAllList);
// Confirm a task
router.patch("/confirm/:id", authenticateToken, listController.addConfirmTask);
router.get("/confirm", authenticateToken, listController.getConfirmTask);
router.delete("/deleteList/:id", authenticateToken, listController.deleteList);
module.exports = router;
