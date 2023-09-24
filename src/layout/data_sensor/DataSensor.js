import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";
import styles from "./Datasensor.module.scss";
import Tippy from "@tippyjs/react/headless";
import {HiBars3} from "react-icons/hi2";

import Nav from "../../components/navbar/Nav";

const cx = classNames.bind(styles);

function Datasensor() {
    const location = useLocation();

    const renderTippy = (prop) => {
        return (
            <div>
                <Nav props = {location.state}/>
            </div>
        )
    }

    return (
        <div className={cx('ctn')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('card')}>
                        <div className={cx('card-header')}>
                            <h4>Data Sensor</h4>
                            <Tippy render={renderTippy} interactive delay={[200, 100]}
                                offset={[-85, 10]} placement="bottom"
                            >
                                <span className={cx('icon-nav')}>
                                    <HiBars3 className={cx('icon')}/>
                                </span>
                            </Tippy>
                        </div>

                        <div className={cx('card-body')}>
                        <table className={cx('table')}>
                            <thead>
                                <tr>
                                    <th scope="col" className={cx('id')}>Id</th>
                                    <th scope="col">Ssid</th>
                                    <th scope="col">Temperature</th>
                                    <th scope="col">Humidity</th>
                                    <th scope="col">Brightness</th>
                                    <th scope="col">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td  className={cx('id')}>1</td>
                                    <td>1</td>
                                    <td>30.5°C</td>
                                    <td>80%</td>
                                    <td>0.5Klux</td>
                                    <td>08:00</td>
                                </tr>
                                <tr>
                                    <td  className={cx('id')}>2</td>
                                    <td>1</td>
                                    <td>32.5°C</td>
                                    <td>85%</td>
                                    <td>0.55Klux</td>
                                    <td>09:00</td>
                                </tr>
                                <tr>
                                    <td  className={cx('id')}>3</td>
                                    <td>1</td>
                                    <td>31°C</td>
                                    <td>88%</td>
                                    <td>0.54Klux</td>
                                    <td>10:00</td>
                                </tr>
                                <tr>
                                    <td  className={cx('id')}>4</td>
                                    <td>1</td>
                                    <td>31.5°C</td>
                                    <td>88.4%</td>
                                    <td>0.53Klux</td>
                                    <td>11:00</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Datasensor;