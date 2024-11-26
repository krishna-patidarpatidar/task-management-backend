const List = require("./model.task-management");

const listService = {};

listService.createList = async (listname,userId) => {
  return await List.create(listname,userId);
};

listService.getAllList = async (page, limit,userId) => {
  return await List.find({
    isDeleted: { $ne: true },
    isConfirmed: { $ne: true },
    userId:userId

  })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
};
// Confirm a task (move from pending to confirmed)
listService.addConfirmTask = async (id) => {
  return await List.findByIdAndUpdate(
    { _id: id },
    { $set: { isConfirmed: true } }
  );
};
listService.getConfirmTask = async () => {
  return await List.find({ isConfirmed: true, isDeleted: false });
};
listService.deleteList = async (id) => {
  return await List.findByIdAndUpdate(
    { _id: id },
    { $set: { isDeleted: true } }
  );
};

module.exports = listService;
