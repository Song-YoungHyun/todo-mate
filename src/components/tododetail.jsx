import {useState, useEffect, forwardRef, useImperativeHandle, useSyncExternalStore} from "react";
import  '../css/tododetail.css'
import TodoModal from "./todomodal.jsx";
import styled from "styled-components";

export default function Tododetail({selectDate, updateTODOCount}) {

    const [showModal, setShowModal] = useState(false);
    const [selectTODO, setSelectTODO] = useState({key : 0, data : ''});

    useEffect(() => {
        console.log('count update');
        updateTODOCount(serchAllMonthTODO(selectDate.year, selectDate.month));

    },[selectDate]);


    const changeShowModal = (isShow, isNew = false) =>{
        if(isNew){

            var data = getNewTempData(selectDate.year, selectDate.month, selectDate.date);

            setSelectTODO({
                ...selectTODO,
                key: 0,
                data: data
            });
        }

        setShowModal(isShow);
    }

    const cancelMemo = () =>{


       saveTempTODO(selectDate.year, selectDate.month, selectDate.date, selectTODO);

        setShowModal(false)
    }

    const onTODORowClick = (e) =>{



        setSelectTODO({
            key : e.currentTarget.dataset.key,
            data : getTempData(selectDate.year, selectDate.month, selectDate.date, e.currentTarget.dataset.key)
        })
        e.stopPropagation()
        setShowModal(true);

    }



    function modalBuutonClick(isModify){
        var result = false;
        if(isModify){
           result = addTODO(selectDate.year, selectDate.month, selectDate.date, selectTODO);
        }
        else{
            result = deleteTODOitem(selectDate.year, selectDate.month, selectDate.date, selectTODO);
        }

        updateTODOCount(serchAllMonthTODO(selectDate.year, selectDate.month));

        changeShowModal(!result);
    }


    const onModplInputChang = (e) =>{


        /*setSelectTODO(
            {
                ...selectTODO,
                key : selectTODO.key,
                data : e.currentTarget.innerHTML
        //      data : e.currentTarget.value
            }
        );
*/
    }

    const onModalPaste = (e) => {

        e.stopPropagation();
        e.preventDefault();

       // clipboardData = e.clipboardData || window.clipboardData;
       // pastedData = clipboardData.getData('Text');

        for (const clipboardItem of e.clipboardData.files) {
            if (clipboardItem.type.startsWith('image/')) {
                console.log(clipboardItem);


                const img = document.createElement("img");
                img.src = URL.createObjectURL(clipboardItem);
                img.height = 30;
               // img.width = 30;

                img.onload = function (e) {
                    // Create canvas
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const scaleFactor = 30 / img.height;
                    // Set width and height
                    canvas.width = img.width;
                    canvas.height = img.height;
                    // Draw the image
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    var base64 = canvas.toDataURL('image/*');
                    var strImage = base64.replace(/^data:image\/[a-z]+;base64,/, "");

                    img.src = base64;
                    //imgFileContainer.append(img);

                 /*   setSelectTODO(
                        {
                            ...selectTODO,
                            key : selectTODO.key,
                            data : e.currentTarget.innerHTML
                        }
                    );
*/
                }

                e.currentTarget.append(img);

            }
        }
    }

    function divtest(e){

    }

    function onTODOCheckChange(e){
        var key = e.currentTarget.dataset.key;
        var checked = e.currentTarget.checked;

        updateTODOCheck(selectDate.year, selectDate.month, selectDate.date, key, checked);
        updateTODOCount(serchAllMonthTODO(selectDate.year, selectDate.month));

    }

    function onModalInputBlur(e){

        console.log('Editor blur')

       setSelectTODO(
            {
                ...selectTODO,
                key : selectTODO.key,
                data : e.currentTarget.innerHTML
                //      data : e.currentTarget.value
            }
        );
    }


    return  <div className="flex-container-tododetail">
        <div className="flex-container-todolist">
            { (getDateTODOList(selectDate.year, selectDate.month, selectDate.date).map((value, idx) => (
                <TODORow key={idx}  >
                    <input  data-key={value.key} type={"checkbox"} checked={value.checked} onChange={onTODOCheckChange} onClick={(e)=>{e.stopPropagation();}}/>
                    <TODODiv onClick={onTODORowClick} data-todo={value.data} data-key={value.key} dangerouslySetInnerHTML={{ __html: value.data }}>

                    </TODODiv>


                    {/*<TODOLabel onClick={onTODORowClick} data-todo={value.data} data-key={value.key}>{value.data}</TODOLabel>*/}

                </TODORow>

            )))}
        </div>
        <div >
            {/*<TodoModal show={showModal} todo={selectTODO} changeShowModal={changeShowModal} modalButtonClick={modalBuutonClick} />*/}
            <div>
                <ModalOverlay $visible={showModal} onClick={() => cancelMemo()}>
                    <ModalInner  onClick={(e)=>{e.stopPropagation();}}>
                        <ModalButtonBox>
                            {selectTODO.key !== 0 ? (<ModalButton onClick={() => {modalBuutonClick(true)}}>수정</ModalButton>)
                                                    :(<ModalButton onClick={() => {modalBuutonClick(true)}}>저장</ModalButton>)}

                            <ModalButton onClick={() => modalBuutonClick(false)}>삭제</ModalButton>
                        </ModalButtonBox>
                        {selectTODO !== undefined ? (<ModalInput contentEditable="true" onBlur={onModalInputBlur} dangerouslySetInnerHTML={{ __html: selectTODO.data }} value={selectTODO.data} onInput={onModplInputChang} onPaste={onModalPaste}/>)
                            : (<ModalInput contentEditable="true" onInput={onModplInputChang} onPaste={onModalPaste}></ModalInput>)}
                        {/*}   <div contentEditable="true" onDoubleClick={divtest}> type here
                            <img src="http://t2.gstatic.com/images?q=tbn:ANd9GcQCze-mfukcuvzKk7Ilj2zQ0CS6PbOkq7ZhRInnNd1Yz3TQzU4e&t=1" />
                        </div>*/}
                    </ModalInner>
                </ModalOverlay>
            </div>
        </div>
        <button onClick={() => {changeShowModal(true, true)}}>메모</button>
        {/*  <button onClick={onTest}>test</button>*/}
    </div>


}


function getNewTempData(year, month, date){
    var idStr ='';
    idStr = idStr.concat(year, String(month).padStart(2,0), date);
    var todoList = new Object()
    //localStorage.removeItem(idStr);
    //createTestData(year,month,date);
    if(localStorage.length > 0){

        var localData = localStorage.getItem(idStr);
        if(localData != null){
            todoList = JSON.parse(localData);

            if(todoList.temp != undefined)
                return  todoList.temp;
            else
                return '';

        }
        else{

            return ''
        }
    }
    else{

        return  '';
    }

}

function getTempData(year, month, date, key){
    var idStr ='';
    var result = ''
    idStr = idStr.concat(year, String(month).padStart(2,0), date);
    var todoList = new Object()
    //localStorage.removeItem(idStr);
    //createTestData(year,month,date);
    if(localStorage.length > 0){

        var localData = localStorage.getItem(idStr);
        if(localData != null){
            todoList = JSON.parse(localData);

            todoList.todos.every((item) => {
                if(item.key == key){

                    if(item.temp == undefined || item.temp == '') {
                        result = item.data;
                    }
                    else{

                        result = item.temp;
                    }




                    return false;
                }
                else{
                    return  true;
                }
            })


        }

    }

    return  result
}
function saveTempTODO(year, month, date, todo){
    var idStr ='';
    idStr = idStr.concat(year, String(month).padStart(2,0), date);

    var todoList = new Object();
    todoList.id = idStr;
    todoList.todos = getDateTODOList(year, month, date);

    if(todo.key == 0){
        todoList.temp = todo.data;

    }
    else{
        todoList.todos.every((item) => {
            if(item.key == todo.key){
                item.temp = todo.temp || todo.data;



                return false;
            }
            else{
                return  true;
            }
        })


    }


    localStorage.setItem(idStr, JSON.stringify(todoList));

    return true;
}

function addTODO(year, month, date, todo, cancel = false){
    var idStr ='';
    idStr = idStr.concat(year, String(month).padStart(2,0), date);

    var today = new Date();
    var nowTime = String(today.getHours()).padStart(2,0) +
                  String(today.getMinutes()).padStart(2,0) +
                   String(today.getSeconds()).padStart(2,0);

    var todoList = new Object();
        todoList.id = idStr;
        todoList.todos = getDateTODOList(year, month, date);

    if(todo.key == 0){
        todo.key =  idStr + nowTime;
        todo.checked = false;

        if(cancel){
            todo.temp = todo.data;
            todo.data = '';
        }
        else{
            todo.data =  todo.temp ;
            todo.temp = ''
        }


        todoList.todos.push(todo);
    }
    else{
       todoList.todos.every((item) => {
            if(item.key == todo.key){
                item.data = todo.temp || todo.data;
                item.temp = '';


                return false;
            }
            else{
                return  true;
            }
        })


    }


    localStorage.setItem(idStr, JSON.stringify(todoList));

    return true;
}

function deleteTODOitem(year, month, date, todo){
    var idStr ='';
    idStr = idStr.concat(year, String(month).padStart(2,0), date);

    var todoList = new Object();
    todoList.id = idStr;
    todoList.todos = getDateTODOList(year, month, date);

    todoList.todos.every((item) => {
        if(item.key == todo.key){
            todoList.todos = todoList.todos.filter((e) => e !== item);
            return false;
        }
        else{
            return  true;
        }
    })

    localStorage.setItem(idStr, JSON.stringify(todoList));

    return true;
}

function serchAllMonthTODO(year, month){
    var idStr ='';
     idStr = idStr.concat(year, String(month).padStart(2,0));

     var complieTODO = 0;
     var AllTODO = 0;

    for(let i = 0; i < localStorage.length; i++){
        var key = localStorage.key(i);

        if(key.startsWith(idStr)){
            var todoList = JSON.parse(localStorage.getItem(key));

            todoList.todos.forEach((item) =>{
                AllTODO ++;
                if(item.checked)
                    complieTODO++;
            })
        }
    }

    return {complieTODO, AllTODO};
}

function updateTODOCheck(year, month, date, key, checked){
    var idStr ='';
    idStr = idStr.concat(year, String(month).padStart(2,0), date);

    var todoList = JSON.parse(localStorage.getItem(idStr));

    todoList.todos.every((item) => {
        if(item.key == key){
            //item.checked = true;
            item.checked = checked;
            return false;
        }
        else{
            return  true;
        }
    })

    localStorage.setItem(idStr, JSON.stringify(todoList));
}

function getDateTODOList(year, month, date){
    var idStr ='';
    idStr = idStr.concat(year, String(month).padStart(2,0), date);
    var todoList = new Object()
    //localStorage.removeItem(idStr);
    //createTestData(year,month,date);
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

function createTestData(year,month,date){
    var idStr ='';
    idStr = idStr.concat(year, String(month).padStart(2,0), date);
    var today = new Date();


    var todoLists = new Object();
    var todos = [];

    for(let i =0; i < 3; i++){
        var nowTime = String(today.getHours()).padStart(2,0) +
            String(today.getMinutes()).padStart(2,0) +
            String(today.getSeconds() + i).padStart(2,0);
        var todo = new Object();
        todo.key = idStr + nowTime;
        todo.checked = false;
        todo.data = 'test';

        todos.push(todo);
    }



    todoLists.id = idStr;
    todoLists.todos = todos;

    console.log( JSON.stringify(todoLists));

    localStorage.setItem(idStr, JSON.stringify(todoLists));
}

const TODORow = styled.div`
    border-radius: 7px;
    
    &:hover{
        background: cornflowerblue;
    } 
`

const TODOLabel = styled.label`
    margin-left: 5px;
    display: inline-block;
    width: 90%;
    min-height: 24px;
`

const TODODiv = styled.div`
    margin-left: 5px;
    display: inline-block;
    width: 90%;
    min-height: 24px;
`


const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.$visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 360px;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`

const ModalButtonBox = styled.div`
    display: flex;
    margin-bottom: 20px;
  
`
const ModalButton = styled.button`
    flex: auto;
    margin: 3px;
    height: 60px;
`
const ModalInput = styled.div`
    width: 100%;
    height: 300px;
    color: fieldtext;
    display: inline-block;
    text-align: start;
    background-color: field;
`
/*
const ModalInput = styled.textarea`
    width: 100%;
    height: 300px;

`

 */
