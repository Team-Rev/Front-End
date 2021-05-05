import React, { useState, useEffect } from 'react'
import { Sidebar } from '../Sidebar/Sidebar'
import { LoginForm } from '../Login/LoginForm'
import axios from 'axios';

export function Login() {

   return (
        <>
            <Sidebar/>
            <LoginForm/>
        </>
    );
   }
