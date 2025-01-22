import {forwardRef, useState} from "react";
import styled from 'styled-components';
import '../css/modal.css';

const TodoModal = forwardRef(({year, month, date}, ref)=>{
  const [isVisible, setVisible] = useState(false);

  const onShowModalClick = (e) =>{
      setVisible(true);
  }

  const onModalOverlayClick = (e) =>{
      setVisible(false);
  }

  const onTODOModifyClick = (e) =>{

  }

  const onTODODeleteClick = (e) =>{

  }



    return(
        <div>
            <button onClick={onShowModalClick}>메모</button>
            <ModalOverlay visible={isVisible} onClick={onModalOverlayClick}>
                <ModalInner  onClick={(e)=>{e.stopPropagation();}}>
                    <ModalButtonBox>
                        <ModalButton onClick={onTODOModifyClick}>수정</ModalButton>
                        <ModalButton onClick={onTODODeleteClick}>삭제</ModalButton>
                    </ModalButtonBox>
                    <ModalInput/>


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

