import {useState, useEffect} from "react";
import  '../css/tododetail.css'

export default function Tododetail ({year, month, date}){

    return <div className="flex-container-todolist">
        <div>
            <input type={"checkbox"}/>
            <label>test</label>
        </div>
        <div>
            <input type={"checkbox"}/>
            <label>test</label>
        </div>
        <div>
            <input type={"checkbox"}/>
            <label>test</label>
        </div>
    </div>
}

function GetDateTODOList(year, month, dtate){

}

