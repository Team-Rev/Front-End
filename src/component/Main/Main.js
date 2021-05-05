import React, { useState, useEffect } from 'react'
import { Sidebar } from './Sidebar/Sidebar'
import './main.css'
import axios from 'axios'

export function Main() {

    return (
        <div>
            <Sidebar/>
        </div>
    );
}
