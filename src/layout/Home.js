import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useState } from "react";

import Temperature from "../components/temperature/Temperature";
import Humidity from "../components/humidity/Humidity";
import Brightness from "../components/brightness/Brightness";
const cx = classNames.bind(styles);

function Home() {
    const [index, setIndex] = useState(0);

    const arr = [20, 25, 30, 35, 38, 26, 30];
    
    setTimeout(() => {
        if (index == 6) {
            setIndex(0);
        }
        else {
            setIndex(index + 1);
        }
    }, 2000);

    return (
        <div className={cx('container_app')}>
            <div className={cx('container_app-header')}>
            <div class="container text-center">
                <div class="row">
                    <div class="col">
                        <Temperature temp = {arr[index]}/>
                    </div>
                    <div class="col">
                        <Humidity humidity = {80}/>
                    </div>
                    <div class="col">
                        <Brightness brightness = {5}/>
                    </div>
                </div>
                </div>
            </div>
            <div className={cx('container_app-body')}>

            </div>
        </div>
    )
}

export default Home;