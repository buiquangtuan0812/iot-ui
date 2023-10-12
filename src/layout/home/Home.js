import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import axios from "axios";
import { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import React from "react";
import Tippy from "@tippyjs/react/headless";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import Temperature from "../../components/temperature/Temperature";
import Humidity from "../../components/humidity/Humidity";
import Brightness from "../../components/brightness/Brightness";
import AreaChart from "../../components/chart/AreaChart";
import Nav from "../../components/navbar/Nav";
// import WebSocket from "../../websocket/WebSoket";

import ImgLight from "../../img/idea.png";
import LightOf from "../../img/big-light.png";
import FanOff from "../../img/fan.png";
import FanOn from "../../img/fan (1).png";
import {HiBars3} from "react-icons/hi2";
const client = new W3CWebSocket('ws://localhost:8000');
const cx = classNames.bind(styles);

function Home() {
    const location = useLocation();
    const props = location.state;
    const [controlLight, setControlLight] = useState(props ? props.stateLed : false);
    const [controlFan, setControlFan] = useState(props ? props.stateFan: false);
    const [dataSensor, setDataSensor] = useState(null);

    useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        client.onmessage = (msg) => {
            const messageData = msg.data;
            const data = JSON.parse(messageData);
            setDataSensor(data);
        };
    }, [dataSensor]);

    const renderTippy = (prop) => {
        return (
            <div>
                <Nav props = {{stateLed: controlLight, stateFan: controlFan}}/>
            </div>
        )
    }
    
    const clickOnLed = () => {
        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let day = date.getDate();
        day = day < 10 ? '0' + day : day;
        let hour = date.getHours();
        hour = hour < 10 ? '0' + hour : hour;
        let minute = date.getMinutes();
        minute = minute < 10 ? '0' + minute : minute;
        let second = date.getSeconds();
        second = second < 10 ? '0' + second : second;
        const time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        const data = {
            ssid: 1,
            type: 'Light',
            action: controlLight ? 'Off' : 'On',
            time: time
        };
        if (controlLight){
            setControlLight(false);
            axios.post('http://localhost:8008/mosquitto/led/turn-off', data)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else {                                                     
            setControlLight(true);
            axios.post('http://localhost:8008/mosquitto/led/turn-on', data)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
    
    const clickOnFan = () => {
        if (controlFan){
            setControlFan(false);
        }
        else {
            setControlFan(true);
        }
        
    }
   
    return (
        <div className={cx('container_app')}>
            <div>
                <div className={cx('title')}>
                    <h3>
                        IoT & Ứng dụng
                    </h3>
                    <Tippy render={renderTippy} interactive delay={[100, 100]}
                        offset={[-85, -3]} placement="bottom"
                    >
                        <span className={cx('icon-nav')}>
                                <HiBars3/>
                        </span>
                    </Tippy>
                </div>
            </div>
            <div className={cx('container_app-header')}>
                <div className={cx('row')}>
                    <div className={cx('col-4')}>
                        <Temperature temp = {dataSensor ? dataSensor["temp"] : ''}/>
                    </div>
                    <div className={cx('col-4')}>
                        <Humidity humidity = {dataSensor ? dataSensor["humidity"] : ''}/>
                    </div>
                    <div className={cx('col-4')}>
                        <Brightness brightness = {dataSensor ? dataSensor["bright"] : ''}/>
                    </div>
                </div>
            </div>
            <div className={cx('container_app-body')}>
                <div className={cx('row')}>
                    <div className={cx('col-9')}>
                        <AreaChart data = {dataSensor ? dataSensor : ''}/>
                    </div>
                    <div className={cx('col-3')}>
                        <div className={cx('item-light')}>
                            {controlLight ?
                                <img src = {ImgLight} alt = "Light On" className={cx('light-on')}/>
                                : <img src = {LightOf} alt = "Light Of" className={cx('light-off')}/>
                            }
                            {controlLight ?
                                <button onClick={clickOnLed} className={cx('off')}>OFF</button> 
                                : <button onClick={clickOnLed} className={cx('on')}>ON</button>  
                            }
                        </div>

                        <div className={cx('item-fan')}>
                            {controlFan ?
                                <img src = {FanOn} alt = "Light On" className={cx('fan-on')}/>
                                : <img src = {FanOff} alt = "Light Of" className={cx('fan-off')}/>
                            }
                            {controlFan ?
                                <button onClick={clickOnFan} className={cx('off')}>OFF</button> 
                                : <button onClick={clickOnFan} className={cx('on')}>ON</button>  
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* <WebSocket save = {saveDataSensor}/> */}
        </div>
    )
}

export default Home;