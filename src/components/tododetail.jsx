import {useState, useEffec, forwardRef, useImperativeHandle} from "react";
import  '../css/tododetail.css'

const Tododetail = forwardRef(({year, month, date},ref) => {
    const [dotos, setTODOList] = useState(GetDateTODOList(year, month, date));

    {/*
       useEffect(()=> {
        setTODOList(GetDateTODOList(year, month, date));
    })
    */}

    useImperativeHandle(ref, () =>({
        showTODODetail :(year, month, date) => {
            var todos = GetDateTODOList(year, month, date);
            setTODOList(todos);
        },
    }));




    return (dotos.map((value, idx) => (
        <div key={idx}>
            <input type={"checkbox"}/>
            <label>{value.data}</label>
        </div>
    )));
})

function GetDateTODOList(year, month, date){
    var idStr ='';
    idStr = idStr.concat(year, String(month).padStart(2,0), date);
    var todoList = new Object()
   // CreateTestData(year,month,date);

    if(localStorage.length > 0){

        var localData = localStorage.getItem(idStr);
        if(localData != null){
            todoList = JSON.parse(localData);
            return todoList.todos;
        }
        else{

            todoList.id = idStr;
            todoList.todos = [];
            return  todoList.todos;
        }
    }
    else{

        todoList.id = idStr;
        todoList.todos = [];
        return  todoList.todos;
    }

}

function CreateTestData(year,month,date){
    var idStr ='';
    idStr = idStr.concat(year, month, date);

    var todoLists = new Object();
    var todos = [];

    for(let i =0; i < 3; i++){
        var todo = new Object();
        todo.id = i;
        todo.data = 'test';

        todos.push(todo);
    }



    todoLists.id = idStr;
    todoLists.todos = todos;

    localStorage.setItem(idStr, JSON.stringify(todoLists));
}

export default Tododetail;
