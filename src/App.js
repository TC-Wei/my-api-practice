import './App.css';
import axios from 'axios';
import {useState,useEffect} from 'react'

function App() {
  const [todos,setTodos] = useState([])
  const [inputText,setInputText] = useState('')

  useEffect(()=>{
    const fetchData = axios.get('https://jsonplaceholder.typicode.com/todos')
    .then((res)=>{setTodos(res.data)})
    .catch((err) => { console.error('抓取資料失敗:', err) }) 
  },[])
  const editTodo = (id,newTitle)=>{
    if(inputText === ''){
      alert('請輸入代辦事項')
      return
    }
    setTodos(todos.map((todo)=>{
      if(todo.id === id){
        return{...todo,title:newTitle}
      }else{
        return todo
      }
    }))
  setInputText('')}
  const addTodo = (newTitle)=>{
    if(inputText === ''){
      alert('請輸入代辦事項')
      return
    }
    setTodos([...todos,{id:Date.now(),title:newTitle}])
    setInputText('')} 


    const deleteTodo=(id)=>{
      setTodos(todos.filter((todo)=>{
        return todo.id !== id
      }))
    }
  return (
    <div className="App">
      <header className="App-header">
        <div>
        <h1>API 練習</h1>
        <input placeholder="請輸入代辦事項"value={inputText} onChange={(e)=>{setInputText(e.target.value)}}/>
        <button onClick={()=>{addTodo(inputText)}}>add</button>{/* 新增 */}
        <button onClick={()=> {setTodos([])}}>clear all</button> {/* 刪除全部 */}
        <ol>
          {todos.map((todo)=>{
            return (
              <li key={todo.id}>{todo.title}
              <button onClick={()=>{editTodo(todo.id,inputText)}}>edit</button>
              <button onClick={()=>{deleteTodo(todo.id)}}>delete</button>

              </li>
            )
          })}
        </ol>
      </div>
      </header>
    </div>
  );
}

export default App;
