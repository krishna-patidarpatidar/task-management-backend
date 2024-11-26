const ListModel = require("./model.task-management");
const listController = {};
const listService=require('./service.task-management')


listController.createList = async (req, res) => {
  try {
    const userId=req._id
    const { listname } = req?.body;
    const listdata = await listService.createList({
        listname,userId
      });
      return res.send({
        status: true,
        msg: "List created successfully ",
        data: listdata,
      });

  } catch (error) {
    console.log(error,'error')
    return res.send({
      status: false,
      msg: "Something went wrong",
      data: null,
    });
  }
};

listController.getAllList = async (req, res) => {
  const userId=req._id

  try {
    const page = parseInt(req?.query.page) || 1;
    const limit = parseInt(req?.query.limit) || 10;
    const totalList = await ListModel.countDocuments();
    const totalpages = Math.ceil(totalList / limit);
    const nextPage = page < totalpages ? page + 1 : null;
    // const Clist = await ClistModel.find()
    //   .skip((page - 1) * limit)
    //   .limit(limit);
    const list = await listService.getAllList(page, limit,userId);
    if (!list.length) {
      return res.send({
        status: false,
        msg: "No data found",
        data: null,
      });
    } else {
      return res.send({
        length: list.length,
        status: true,
        msg: "List retrieved sucessfully",
        data: list,
        page,
        nextPage,
        totalpages,
        totalList,
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      status: false,
      msg: "Something went wrong",
      data: null,
    });
  }
};

// Confirm a task
listController.addConfirmTask = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await listService.addConfirmTask(id);
      return res.send({
        status: true,
        msg: "ConfirmTask add sucessfully",
        data: task,
      });
    } catch (error) {
      res.status(500).json({ status:false, error,msg: 'Failed to confirm task' });
    }
  };
// Confirm a task
listController.getConfirmTask = async (req, res) => {
    try {
    
      const task = await listService.getConfirmTask();
      return res.send({
        status: true,
        msg: "ConfirmTask Geted sucessfully",
        data: task,
      });
    } catch (error) {
      res.status(500).json({ status:false, error,msg: 'Failed to get confirm task' });
    }
  };

listController.deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    const listDataDelete = await listService.deleteList(id);
    if (!listDataDelete) {
      return res.send({
        status: false,
        msg: "List not found",
        data: null,
      });
    }
    return res.send({
      status: true,
      msg: "List delete successfully",
      data: listDataDelete,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: false,
      msg: "Something went wrong",
      data: null,
    });
  }
};


module.exports = listController;