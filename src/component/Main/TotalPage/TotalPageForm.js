import React, { useEffect } from 'react';
import $ from 'jquery'
import style from './TotalPage.module.css'
import Doughnut from '../Doughnut'
import { Link } from 'react-router-dom'

export function TotalPageForm(props) {
    
    return (
        <div className="board">
          <div className={style.container}>
            <div className={style.inner}>
              <div className={style.maintab}>
                <Link className={style.p}>종합</Link>
                <Link className={style.p}>정답</Link>
                <Link className={style.p}>오답</Link>               
              </div>
             <div style={{width : 250 , margin : "0 auto"}}> 
                <Doughnut/> 
             </div>
             <div className={style.total}>
                <div className={style.total_box}>
                  <p>전체</p>
                  <p>20</p>
                </div>
                <div className={style.total_box}>
                  <p>정답</p>
                  <p style={{color : "#25bc6d"}}>15</p>
                </div>
                <div className={style.total_box}>
                  <p>오답</p>
                  <p style={{color : "red"}}>5</p>
                </div>
             </div>
             <div>
                <p className={style.keyword}>POINT KEYWORDS</p>
             </div>
             <div>
                <button className={style.btna}>Inter-VLAN-Routing</button>
                <button className={style.btnb}>Security</button>
                <button className={style.btna}>OSPF</button>
                <button className={style.btnb}>Subnetting</button>
                <button className={style.btna}>Threat</button>
                <button className={style.btnb}>VLAN</button>
                <button className={style.btna}>Routing</button>
                <button className={style.btnb}>ACL</button>
                <button className={style.btna}>VLSM</button>
                <button className={style.btnb}>Spyware</button>
                <button className={style.btna}>NAT</button>
                <button className={style.btnb}>Protocol</button>
                <button className={style.btna}>TCP-IP</button>
                <button className={style.btnb}>Switch Device</button>
                <button className={style.btna}>QoS Concepts</button>
                <button className={style.btnb}>Traffic</button>
                <button className={style.btna}>Troubleshooting</button>
             </div>
           </div>  
          </div>  
        </div>
    );
};
