import axios from 'axios';
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import './App.css';
import { ITodoType } from './TodoType';
import Todo from './Components/Todo';

const App: FunctionComponent =() => {
  const [date,setDate]=useState<any>();
  const [covid,setCovid]=useState<any>();
  const [cases,setCases]=useState<string>("");
  const [test,setTest]=useState<string>("");

  const getApi = async () => {
    const res= await axios.get<any>("https://raw.githubusercontent.com/ozanerturk/covid19-turkey-api/master/dataset/timeline.json")
    setCovid(res.data[date].deaths)
    setCases(res.data[date].cases)
    setTest(res.data[date].tests)
  }
  useEffect(()=>{
    getApi()
  },[date])

    const [task,setTask]=useState<string>("");
    const [deadline,setDeadline]=useState<number>(0);
    const [todoList,setTodoList]=useState<ITodoType[]>([]);

    const taskChange = (e: ChangeEvent<HTMLInputElement>):void=>{
          if(e.target.name==="task"){
            setTask(e.target.value)
          }else{
            setDeadline(Number(e.target.value))
          }
    }

    const addBtn=()=>{
        if(task==""){ 
          alert("write something")
        }else{
          const newTask={taskName:task,deadlineNum:deadline}
          setTodoList([...todoList , newTask]);
          setTask("");
          setDeadline(0);
        }}

    const completeTask = (taskNameToDelete: string): void =>{
      setTodoList(
        todoList.filter((task)=>{
          return task.taskName != taskNameToDelete;
        })
      )
    }

  return (
    <div className="App">
        <h2> Turkey COVID - Coronavirus Statistics / ToDo List </h2>
        <div className='header'>
            <div className='covidPanel'>
              <div>
                <input className='covidSearch' placeholder='Example: 17/04/2020' value={date} onChange={e=>setDate(e.target.value)}/>
              </div>
              <p> Tests: {test} </p>
              <p> Cases: {cases} </p>
              <p> Deaths: {covid} </p>
            </div> 
            <div className='inputContainer'>
                  <input type="text" placeholder='task' name='task' value={task} onChange={taskChange}/>
                  <input type="number" placeholder='deadline' name="deadline" value={deadline} onChange={taskChange} />
            </div>
            <button onClick={addBtn}>Add</button>
        </div>
            <div className='todoList'>
              {todoList.map((task:ITodoType,key:Number)=>{
                return <Todo  task={task} completeTask={completeTask}  />
              })}
            </div>
            <footer>
            <p>This application updates data sets by scarping data from the web site of of Turkish Ministry of Health <a href='https://covid19.saglik.gov.tr/'>(https://covid19.saglik.gov.tr/)</a> every 5 minutes. </p>
          </footer>       
    </div>
  )
}
export default App;
