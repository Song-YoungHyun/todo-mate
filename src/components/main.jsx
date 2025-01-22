import {useRef, useState} from "react";
import PrintCalender from "./calendar.jsx";
import Tododetail from "./tododetail.jsx";
import TodoModal from "./todomodal.jsx"
import  '../css/tododetail.css'
import  '../css/modal.css'

export default function Main(){
    var arrDayStr = ['일', '월', '화', '수', '목', '금', '토'];
    const [yearMonth, setYearMonth] = useState(GetNowYearMonth());

    const childRef = useRef();
    const todoDetailRef = useRef();

    const onBeforeMonthButtonClick = () =>{
      const nowYearMonth = {...yearMonth};
        const selectYearMonth = GetBeforeYearMonth(nowYearMonth);
        setYearMonth(selectYearMonth);
        childRef.current.updateDays(selectYearMonth);

    };

    const onNextMonthButtonClick = ()=>{
        const nowYearMonth = {...yearMonth};
        const selectYearMonth = GetNextYearMonth(nowYearMonth);
        setYearMonth(selectYearMonth);
        childRef.current.updateDays(selectYearMonth);
    };

    function dateSelectCallBack(selectDate){
        todoDetailRef.current.showTODODetail(yearMonth.year, yearMonth.month, selectDate);
    }

    return <div className="APP-Main">
        <div>
            <div>
                <label>{yearMonth.year}년 {yearMonth.month}월 </label>
                <button onClick={onBeforeMonthButtonClick}>◀</button>
                <button onClick={onNextMonthButtonClick}>▶</button>
            </div>
            <div className="flex-container">
                {arrDayStr.map((value, idx) =>(
                    <label className="flex-item-day" key={idx}>{value}</label>
                ))}
                <PrintCalender  year={yearMonth.year} month={yearMonth.month} callBack={dateSelectCallBack} ref={childRef} />
            </div>
        </div>
        <div className="flex-container-tododetail">
            <div className="flex-container-todolist">
                <Tododetail year={yearMonth.year} month={yearMonth.month} date={yearMonth.date} ref={todoDetailRef}/>
            </div>

            <div >
                <TodoModal/>
            </div>
        </div>



    </div>
}

function GetNowYearMonth(){
    const today = new Date();

    return {year : today.getFullYear(), month : today.getMonth() +1, date : today.getDate() };
}

function GetBeforeYearMonth(nowYearMonth){
    var nowMonth = nowYearMonth.month;
    if(nowMonth - 1 < 1){
        return {year : nowYearMonth.year - 1 , month: 12, date : 1};
    }
    else{
        return {year : nowYearMonth.year, month: nowMonth -1, date : 1};
    }
}

function GetNextYearMonth(nowYearMonth){
    var nowMonth = nowYearMonth.month;
    if(nowMonth + 1 > 12){
        return {year : nowYearMonth.year + 1 , month: 1, date : 1};
    }
    else{
        return {year : nowYearMonth.year, month: nowMonth + 1, date : 1};
    }
}
