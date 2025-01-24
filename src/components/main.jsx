// tododetail.jsx와 코드를 합침


import {useEffect,  useState} from "react";
import PrintCalender from "./calendar.jsx";
import Tododetail from "./tododetail.jsx";
import  '../css/tododetail.css'
import  '../css/modal.css'
import styled from "styled-components";

export default function Main(){
    var arrDayStr = ['일', '월', '화', '수', '목', '금', '토'];
    const [selectDate, setSelectDate] = useState(GetNowYearMonth());
    const [completeTODO, setCompleteTODO] = useState(0);
    const [allTODO, setAllTODO] = useState(0);

    useEffect(() =>{
        console.log(JSON.stringify(selectDate));
    })


    const onBeforeMonthButtonClick = () =>{
      const nowYearMonth = {...selectDate};
        const selectYearMonth = GetBeforeYearMonth(nowYearMonth);
        setSelectDate(selectYearMonth);


    };

    const onNextMonthButtonClick = ()=>{
        const nowYearMonth = {...selectDate};
        const selectYearMonth = GetNextYearMonth(nowYearMonth);
        setSelectDate(selectYearMonth);

    };

    function updateDate(date){
       setSelectDate({
           ...selectDate,
           year: selectDate.year,
           month: selectDate.month,
           date: date
       });

        // todoDetailRef.current.showTODODetail(yearMonth.year, yearMonth.month, selectDate);
    }

    function updateTODOCount(param){
        setCompleteTODO(param.complieTODO);
        setAllTODO(param.AllTODO);
    }

    return <div className="APP-Main">
        <div>
            <Title>
                <SelectYearMont>{selectDate.year}년 {selectDate.month}월 </SelectYearMont>
                <MR5Div>
                    <AllTODOIcon type={"checkbox"} disabled checked></AllTODOIcon>
                    <label>{allTODO}</label>
                </MR5Div>
                <MR5Div>
                    <label>☺️️</label>
                    <label>{completeTODO}</label>
                </MR5Div>
                <MonthSelecter>
                    <button onClick={onBeforeMonthButtonClick}>◀</button>
                    <button onClick={onNextMonthButtonClick}>▶</button>
                </MonthSelecter>

            </Title>
            <div className="flex-container">
                {arrDayStr.map((value, idx) =>(
                    <label className="flex-item-day" key={idx}>{value}</label>
                ))}
                <PrintCalender  selectDate={selectDate} updateDate={updateDate}  />
            </div>
        </div>
        <Tododetail selectDate={selectDate} updateTODOCount={updateTODOCount}/>




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

const Title = styled.div`
    display: flex;
    align-items: center;
`

const SelectYearMont = styled.label`
    margin-right: 5px;
`

const MR5Div = styled.div`
    margin-right: 5px;
    align-items: center;
    display: flex;
`

const AllTODOIcon = styled.input`
zoom: 1.5
`

const MonthSelecter = styled.div`
    margin: auto 0 auto auto
`
