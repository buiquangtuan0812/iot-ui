import classNames from "classnames/bind";
import styles from "./Styles.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import {HiBars3} from "react-icons/hi2";

import Nav from "../../components/navbar/Nav";

const cx = classNames.bind(styles);

function Action() {
    const [data, setData] = useState([]);
    const location = useLocation();
    const props = location.state;
    useEffect(() => {
        axios.get('http://localhost:8008/action-history/get-all')
            .then (response => {
                setData(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    const renderTippy = (prop) => {
        return (
            <div>
                <Nav props = {props}/>
            </div>
        )
    }
    
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
                <td  className={cx('id')}>{item.id}</td>
                <td>{item.ssid}</td>
                <td>{item.type}</td>
                <td>{item.action}</td>
                <td>{time}</td>
            </tr>
        )
    })

    return (
        <div className={cx('ctn')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('card')}>
                        <div className={cx('card-header')}>
                            <h4>Action History</h4>
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
                                    <th scope="col">Type</th>
                                    <th scope="col">Action</th>
                                    <th scope="col">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderData}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Action;