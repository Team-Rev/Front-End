import React, { useState, useEffect } from 'react';
import axios from 'axios';

//34.64.73.179

export function Container(props){

    var [question, setQuestion] = useState(null);
    const [query, setQuery] = useState("react");

    var token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQG5hdmVyLmNvbSIsImlhdCI6MTYyMDE5NTQ0NiwiZXhwIjoxNjIwMjMxNDQ2fQ.Zw7yxnv59QcZwZ6CTGXrCOe0aS5A4OsVlSsJ7eKhXlI";
    var fixedstring = encodeURIComponent(escape(token));
    useEffect( () => {
        let completed = false;
        async function fetchData(){
            axios({
                method: 'get',
                url: `/problem/question/5`,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    "Authorization" : `Bearer ${fixedstring}`,
                    withCredentials: true,
                    mode: 'no-cors',
                }
            }).then(response => {
                var data = response.data;
                if(!completed) setQuestion(data)
                console.log(data)
            });
        }
        fetchData();
        return () => {
            completed = true;
          };
    }, [fixedstring]);

    
    if(!question) return `NULL`;

    return(
        <div className="board">{question.exam}</div>
    );
}