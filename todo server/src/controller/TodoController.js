import { Task } from "../model/TodoSchema.js"


let AddTask =  async (req,res)=>
{
let reqData = req.body
console.log(reqData)
try
{
    let result = await Task.create(reqData)

    res.status(200).json({
        data:result,
        message:"task added successfully"
    })
}
catch(error)
{
    console.log(error)
    res.status(500).json(error)
}
}

let fetchTask = async(req,res)=>
{
    try
    {
        let result = await Task.find()
        res.status(200).json({
            data:result,
            message:"task fetched successfully"
        })
    }
    catch(error)
    {
        res.status(500).json(error)
    }
}

let UpdateTask = async (req, res) => {
  let { TaskId, TaskStatus, TaskPosition } = req.body;

  try {
    let result = await Task.findByIdAndUpdate(
      { _id: TaskId },
      {
        TaskStatus: TaskStatus,
        TaskPosition: TaskPosition,
      },
      { new: true }
    );

    res.status(200).json({
      data: result,
      message: "Task Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
let DeleteTask = async(req,res)=>
{
    try
    {

    
    let {TaskId} = req.body
    let result = await Task.findByIdAndDelete({_id:TaskId})
    res.status(200).json({
        message:"Task deleted"
    })
} 
catch(error)
    {
  res.status(500).json(error)
    }

}
export {AddTask, fetchTask, UpdateTask, DeleteTask}