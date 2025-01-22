import {useState, useEffect} from "react";

export default function PrintCalender({year, month}){

    const [days, setDays] = useState(GetMonthDays(year, month));
    useEffect(() => {
        setDays(GetMonthDays(year, month));
    });
    return  (days.map((value, idx) =>(
        <div className="flex-item-date" >
            {value !=='' ? (
                <input name='radioinput' type={"radio"}/>
                ):null}
            <label  key={idx}>{value}</label>
        </div>

        )));
}


function GetMonthDays(year, month){
    var days = [];
    var startDate = new Date(year, month-1, 1);
    var lastDate = GetLastDate(year, month);

   for(let i = 0 ; i < startDate.getDay(); i++){
       days.push('');
   }

   for(let i = 1; i < lastDate + 1; i++){
       days.push(i);
    }

   return days;

}


function GetLastDate(year, month){
    var lastDate = [31,28,31,30,31,30,31,31,30,31,30,31];
    if (year % 4 == 0 && year % 100 !=0 || year % 400 == 0)
        lastDate[1]=29;

    return lastDate[month - 1];
}








