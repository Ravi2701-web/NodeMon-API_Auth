import { Task } from "./../models/task.js";
import ErrorHandler from "../middleware/error.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    //Both are same methods
    /* const task=new Task({title});
  await task.save()*/
    await Task.create({
      title,
      description,
      useri: req.user,
    });
    res.status(201).json({
      success: true,
      message: "Task added successfully !!",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  const userid = req.user._id;

  const tasks = await Task.find({ useri: userid });

  res.status(200).json({
    success: true,
    tasks,
  });
};

export const updateTask = async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) return next(new ErrorHandler("Task not found", 404));

  task.isCompleted = !task.isCompleted;

  await task.save();

  res.status(200).json({
    success: true,
    message: "Task updated",
  });
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) return next(new ErrorHandler("Task not found", 404));

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task Deleted",
  });
};
