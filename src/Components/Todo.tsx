import { ITodoType } from "../TodoType";

interface Props{
    task:ITodoType
    completeTask(taskNameToDelete: string): void;
}
const Todo=({task,completeTask}:Props)=> {
return (
    <div className="task">
    <div className="content">
        <span>{task.taskName}</span>
        <span>{task.deadlineNum}</span>
    </div>
    <button
        onClick={() => {
            completeTask(task.taskName);
        }}>X</button>
    </div>
    );
}
export default Todo;
