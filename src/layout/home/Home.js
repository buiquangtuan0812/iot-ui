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
import DustLevel from "../../components/dustLevel/DustLevel";
import AreaChart from "../../components/chart/DataSensorChart/AreaChart";
import DustChartComponent from "../../components/chart/DustLevelChart/DustChart";
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
    const [stateLed, setStateLed] = useState(false);
    const [stateFan, setStateFan] = useState(false);
    const [dataSensor, setDataSensor] = useState(null);
    const [dustLevel, setDustLevel] = useState(null);
    const [isDustAbout80, setIsDustAbout80] = useState(false);

    const getFormattedTimestamp = () =>{
        const date = new Date();
        const year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');
        let hour = String(date.getHours()).padStart(2, '0');
        let minute = String(date.getMinutes()).padStart(2, '0');
        let second = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    };

    useEffect(() => {
        const generateRandomDustLevel = () => {
            const dust = Math.floor(Math.random() * (100 - 15)) + 15;
            setDustLevel(dust);

            if (dust >= 80) {
                setStateFan(true);
                setStateLed(true);
                setIsDustAbout80(true);
                axios.post('http://localhost:8008/mosquitto/warning')
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            else {
                setStateFan(false);
                setStateLed(false);
                setIsDustAbout80(false);
            }
        }

        generateRandomDustLevel();
        const dustLevelInterval = setInterval(generateRandomDustLevel, 3000);
        return () => {
            clearInterval(dustLevelInterval);
        };
    }, []);

    useEffect(() => {
        if (isDustAbout80) {
            const intervalId = setInterval(() => {
                setStateFan((prev) => !prev);
                setStateLed((prev) => !prev);
            }, 300);
            return () => {
                clearInterval(intervalId);
            };
        };
    }, [isDustAbout80]);

    useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        client.onmessage = (msg) => {
            const data = JSON.parse(msg.data);
            setDataSensor(data);
        };
        return () => {
            client.close();
        }
    }, [dataSensor]);

    const renderTippy = (prop) => {
        return (
            <div>
                <Nav props = {{stateLed: controlLight, stateFan: controlFan}}/>
            </div>
        )
    }
    
    const handleClick = (deviceType) => {
        const isLightOn = controlLight;
        const isFanOn = controlFan;

        const time = getFormattedTimestamp();
        let action;
        if (deviceType === 'Light') {
            setControlLight(!isLightOn);
            action =
                (isLightOn && isFanOn) ? 'Off Led On Fan' :
                (isLightOn && !isFanOn) ? 'Off Led Off Fan' :
                (!isLightOn && !isFanOn) ? 'On Led Off Fan' : 'On Led On Fan';
        }
        else {
            setControlFan(!isFanOn);
            action =
                (isLightOn && isFanOn) ? 'On Led Off Fan' :
                (isLightOn && !isFanOn) ? 'On Led On Fan' :
                (!isLightOn && !isFanOn) ? 'Off Led On Fan' : 'Off Led Off Fan';
        }

        const data = {
            ssid: 1,
            type: deviceType,
            action,
            time,
        };

        axios.post('http://localhost:8008/mosquitto/led/controll', data)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
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
                    <div className={cx('col-3')}>
                        <Temperature temp = {dataSensor ? dataSensor["temp"] : ''}/>
                    </div>
                    <div className={cx('col-3')}>
                        <Humidity humidity = {dataSensor ? dataSensor["humidity"] : ''}/>
                    </div>
                    <div className={cx('col-3')}>
                        <Brightness brightness = {dataSensor ? dataSensor["bright"] : ''}/>
                    </div>
                    <div className={cx('col-3')}>
                        <DustLevel dustLevel = {dustLevel}/>
                    </div>
                </div>
            </div>
            <div className={cx('container_app-body')}>
                <div className={cx('row')}>
                    <div className={cx('col-6')}>
                        <AreaChart data = {dataSensor ? dataSensor : ''}/>
                    </div>
                    <div className={cx('col-4')}>
                        <DustChartComponent data = {dustLevel}/>
                    </div>
                    <div className={cx('col-2')}>
                        <div className={cx('item-light')}>
                            {isDustAbout80 ? (
                                stateLed ? (
                                <img src={ImgLight} alt="Light On" className={cx('light-on')} />
                                ) : (
                                <img src={LightOf} alt="Light Off" className={cx('light-off')} />
                                )
                            ) : controlLight ? (
                                <div className={cx('item')}>
                                    <img src={ImgLight} alt="Light On" className={cx('light-on')} />
                                    <button onClick={() => handleClick('Light')} className={cx('off')}>
                                        OFF
                                    </button>
                                </div>
                            ) : (
                                <div  className={cx('item')}>
                                    <img src={LightOf} alt="Light Off" className={cx('light-off')} />
                                    <button onClick={() => handleClick('Light')} className={cx('on')}>
                                        ON
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className={cx('item-fan')}>
                            {isDustAbout80 ? (
                                stateFan ? (
                                    <img src={ImgLight} alt="Fan On" className={cx('fan-on')} />
                                    ) : (
                                    <img src={LightOf} alt="Fan Off" className={cx('fan-off')} />
                                    )
                            ) : controlFan ? (
                                <div className={cx('item')}>
                                    <img src={FanOn} alt="Fan On" className={cx('fan-on')} />
                                    <button onClick={() => handleClick('Fan')} className={cx('off')}>
                                        OFF
                                    </button>
                                </div>
                            ) : (
                                <div className={cx('item')}>
                                    <img src={FanOff} alt="Fan Off" className={cx('fan-off')} />
                                    <button onClick={() => handleClick('Fan')} className={cx('on')}>
                                        ON
                                    </button>
                                </div>
                            )}
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;