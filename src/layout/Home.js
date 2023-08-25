import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useState } from "react";
import React from "react";

import Temperature from "../components/temperature/Temperature";
import Humidity from "../components/humidity/Humidity";
import Brightness from "../components/brightness/Brightness";
import AreaChart from "../components/chart/AreaChart";
import ImgLight from "../img/idea.png";
import LightOf from "../img/big-light.png";
import FanOff from "../img/fan.png";
import FanOn from "../img/fan (1).png";
import Logo from "../img/iot.png";
const cx = classNames.bind(styles);

function Home() {
    const [index, setIndex] = useState(0);
    const [controlLight, setControlLight] = useState(false);
    const [controlFan, setControlFan] = useState(false);

    const arr = [20, 25, 30, 35, 38, 26, 30];
    
    setTimeout(() => {
        if (index === 6) {
            setIndex(0);
        }
        else {
            setIndex(index + 1);
        }
    }, 5000);
    

    return (
        <div className={cx('container_app')}>
            <div className={cx('container text-center')}>
                <div className={cx('title')}>
                    <h3>
                        IoT & Ứng dụng
                    </h3>
                    <img src={Logo} alt="Logo"/>
                </div>
            </div>
            <div className={cx('container_app-header')}>
                <div className={cx('container text-center')}>
                    <div className={cx('row')}>
                        <div className={cx('col')}>
                            <Temperature temp = {arr[index]}/>
                        </div>
                        <div className={cx('col')}>
                            <Humidity humidity = {80}/>
                        </div>
                        <div className={cx('col')}>
                            <Brightness brightness = {5}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('container_app-body')}>
                <div className={cx('row')}>
                    <div className={cx('col-9')}>
                        <AreaChart/>
                    </div>
                    <div className={cx('col-3')}>
                        <div className={cx('item-light')}>
                            {controlLight ?
                                <img src = {ImgLight} alt = "Light On" className={cx('light-on')}/>
                                : <img src = {LightOf} alt = "Light Of" className={cx('light-off')}/>
                            }
                            {controlLight ?
                                <button onClick={() => setControlLight(false)} className={cx('off')}>OFF</button> 
                                : <button onClick={() => setControlLight(true)} className={cx('on')}>ON</button>  
                            }
                        </div>

                        <div className={cx('item-fan')}>
                            {controlFan ?
                                <img src = {FanOn} alt = "Light On" className={cx('fan-on')}/>
                                : <img src = {FanOff} alt = "Light Of" className={cx('fan-off')}/>
                            }
                            {controlFan ?
                                <button onClick={() => setControlFan(false)} className={cx('off')}>OFF</button> 
                                : <button onClick={() => setControlFan(true)} className={cx('on')}>ON</button>  
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;