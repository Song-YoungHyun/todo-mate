import {forwardRef, useState} from "react";
import styled from 'styled-components';
import '../css/modal.css';

const TodoModal = forwardRef(({show, todo, changeShowModal, modalButtonClick}, ref)=>{
  //const [isVisible, setVisible] = useState(show);


  const onTODOModifyClick = (e) =>{
     if(modalButtonClick(true)){
         changeShowModal(false);
     }
  }

  const onTODODeleteClick = (e) =>{
      if(modalButtonClick(false)){
          changeShowModal(false);
      }
  }

  const onModplInputChang = (e) =>{
        if(todo == undefined){
            todo = new Object()
            todo.key = 0;
            todo.data = ''
        }

        todo.data = e.currentTarget.value;

  }


    return(
        <div>
            <button onClick={() => changeShowModal(true)}>메모</button>
            <ModalOverlay visible={show} onClick={() => changeShowModal(false)}>
                <ModalInner  onClick={(e)=>{e.stopPropagation();}}>
                    <ModalButtonBox>
                        <ModalButton onClick={onTODOModifyClick}>수정</ModalButton>
                        <ModalButton onClick={onTODODeleteClick}>삭제</ModalButton>
                    </ModalButtonBox>
                    {todo !== undefined ? (<ModalInput value={todo.data} onChange={onModplInputChang}/>)
                                        : (<ModalInput onChange={onModplInputChang}/>)}

                </ModalInner>
            </ModalOverlay>
        </div>

)


})


const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
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

const ModalInput = styled.textarea`
    width: 100%;
    height: 300px;
    
`

export default TodoModal;

