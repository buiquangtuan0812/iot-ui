import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import styles from "./Datasensor.module.scss";
import Tippy from "@tippyjs/react/headless";
import {HiBars3} from "react-icons/hi2";

import Nav from "../../components/navbar/Nav";
import SelectBox from "../../components/selectbox/SelectBox";

const cx = classNames.bind(styles);

function Datasensor() {
    const location = useLocation();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8008/data-sensor/get-all")
            .then(response => {
                setData(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const renderTippy = (prop) => {
        return (
            <div>
                <Nav props = {location.state}/>
            </div>
        )
    };

    const renderData = data.map((item, index) => {
        const date = new Date(item.time);
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
        return (
            <tr key = {index}>
                <td  className={cx('id')}>{index + 1}</td>
                <td>{item.ssid}</td>
                <td>{item.temperature}</td>
                <td>{item.humidity}</td>
                <td>{item.brightness}</td>
                <td>{time}</td>
            </tr>
        )
    });

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
                            <SelectBox
                                func = {setData}
                                type = {'Data Sensor'}
                            />
                            {data.length > 0 ?
                            (<table className={cx('table')}>
                                <thead>
                                    <tr>
                                        <th scope="col" className={cx('id')}>Stt</th>
                                        <th scope="col">Ssid</th>
                                        <th scope="col">Temperature</th>
                                        <th scope="col">Humidity</th>
                                        <th scope="col">Brightness</th>
                                        <th scope="col">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderData}
                                </tbody>
                            </table>
                            ) :
                            (<div className={cx('data-not-found')}>
                                <span>
                                    <img
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png"
                                        alt=""
                                    />
                                </span>
                                <span className={cx('text')}>No data found for this period of time!</span>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Datasensor;