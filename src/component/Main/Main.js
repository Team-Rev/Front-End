import React from 'react'
import { Sidebar } from './Sidebar/Sidebar'
import './main.css'

export function Main(props) {

    return (
        <div>
            <Sidebar isLogin={props.isLogin}/>
        </div>
    );
}
