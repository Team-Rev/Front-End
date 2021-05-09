import React from 'react'
import { Sidebar } from './Sidebar/Sidebar'
import './main.css'

export function Main(props) {

    return (
        <div>
            <Sidebar nickname={ props.info.nickname} setLoginOpen={props.setLoginOpen} isLogin={props.isLogin} />
        </div>
    );
}
