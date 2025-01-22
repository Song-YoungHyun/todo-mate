import {useState} from "react";
import PrintCalender from "./calendar.jsx";
import Tododetail from "./tododetail.jsx";

export default function Main(){
    var arrDayStr = ['일', '월', '화', '수', '목', '금', '토'];
    const [yearMonth, setYearMonth] = useState(GetNowYearMonth());

    const onBeforeMonthButtonClick = () =>{
      const nowYearMonth = {...yearMonth};
      setYearMonth(GetBeforeYearMonth(nowYearMonth));

    };

    const onNextMonthButtonClick = ()=>{
        const nowYearMonth = {...yearMonth};
        setYearMonth(GetNextYearMonth(nowYearMonth));
    };

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
                <PrintCalender year={yearMonth.year} month={yearMonth.month} />
            </div>
        </div>
        <Tododetail/>


    </div>
}

function GetNowYearMonth(){
    const today = new Date();

    return {year : today.getFullYear(), month : today.getMonth() +1 };
}

function GetBeforeYearMonth(nowYearMonth){
    var nowMonth = nowYearMonth.month;
    if(nowMonth - 1 < 1){
        return {year : nowYearMonth.year - 1 , month: 12};
    }
    else{
        return {year : nowYearMonth.year, month: nowMonth -1};
    }
}

function GetNextYearMonth(nowYearMonth){
    var nowMonth = nowYearMonth.month;
    if(nowMonth + 1 > 12){
        return {year : nowYearMonth.year + 1 , month: 1};
    }
    else{
        return {year : nowYearMonth.year, month: nowMonth + 1};
    }
}
