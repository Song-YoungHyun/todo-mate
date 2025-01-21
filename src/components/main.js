import {useState} from "react";
import PrintCalender from "./calendar";

export default function Main(){
    const [yearMonth, setYearMonth] = useState(GetNowYearMonth());
    const [days, setDays] = useState();
    var arrDayStr = ['일', '월', '화', '수', '목', '금', '토'];
    return <div className="APP-Main">
        <div>
            <label>{yearMonth.year}년 {yearMonth.month}월 </label>
        </div>
        <div className="flex-container">
            {arrDayStr.map((value, idx) =>(
                <label className="flex-item-day" key={idx}>{value}</label>
            ))}
            <PrintCalender {...yearMonth} />
        </div>


    </div>
}

function GetNowYearMonth(){
    const today = new Date();

    return {year : today.getFullYear(), month : today.getMonth() +1 };
}

