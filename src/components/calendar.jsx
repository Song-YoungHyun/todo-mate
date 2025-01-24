
 export default function PrintCalender({selectDate, updateDate}){
    const onDateInputChange=(e) =>{
            updateDate(parseInt(e.target.value));
    }

    function checkToday(value){
        return value == selectDate.date;
    }

    return  (GetMonthDays(selectDate.year, selectDate.month).map((value, idx) =>(
        <div  key={idx} className="flex-item-date" >
            {value !=='' ? (<input name='radioinput' value={value} type={"radio"} onChange={onDateInputChange} checked={checkToday(value)} />

            ):(<></>)}


            <label >{value}</label>
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







