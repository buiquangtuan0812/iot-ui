import classNames from "classnames/bind";
import styles from "./Styles.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import {HiBars3} from "react-icons/hi2";
import {IoMdArrowDropdown} from "react-icons/io";

import Nav from "../../components/navbar/Nav";
import SelectBox from "../../components/selectbox/SelectBox";

const cx = classNames.bind(styles);

function Action() {
    const location = useLocation();
    const props = location.state;
    const [data, setData] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);
    const [check, setCheck] = useState(false);
    const [indexClicked, setIndexClicked] = useState(0);
    const [oldData, setOldData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8008/action-history/get-all')
            .then (response => {
                setData(response.data);
                setOldData(response.data);
                if (response.data.length / 10 > 1) {
                    setEndIndex(10);
                    setCheck(true);
                }
                else {
                    setEndIndex(response.data.length);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const renderTippy = (prop) => {
        return (
            <div>
                <Nav props = {props}/>
            </div>
        )
    };

    const selectType = (type) => {
        let dataAction = oldData;
        setData(dataAction.filter(obj => obj.type === type));
    };

    const renderSelection = (prop) => {
        return (
            <div className={cx('container-type')}>
                <div className={cx('type-item')} onClick={() => selectType('Light')}>Light</div>
                <div className={cx('type-item')} onClick={() => selectType('Fan')}>Fan</div>
            </div>
        )
    };
    
    const renderData = data.slice(startIndex, endIndex).map((item, index) => {
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
                <td>{item.type}</td>
                <td>{item.action.trim()}</td>
                <td>{time}</td>
            </tr>
        )
    });

    const renderDivider = data.slice(0, data.length / 10 + 1).map((item, index) => {
        if (index === indexClicked) {
            return (
                <span key={index} className={cx('clicked')} onClick={() => handleClick(index)}>
                    {index + 1}
                </span>
            )
        }
        else {
            return (
                <span key={index}  onClick={() => handleClick(index)}>
                    {index + 1}
                </span>
            )
        }
    });

    const handleClick = (value) => {
        if (value > indexClicked) {
            setStartIndex(startIndex + (value - indexClicked) * 10);
            setEndIndex((startIndex + (value - indexClicked) * 10) + 10);
            setIndexClicked(value);
        }
        else if (value < indexClicked) {
            setStartIndex(startIndex - (indexClicked - value) * 10);
            setEndIndex((startIndex - (indexClicked - value) * 10) + 10);
            setIndexClicked(value);
        }
        else {
            return;
        }
    };

    const reset = () => {
        setIndexClicked(0);
        setStartIndex(0);
        setEndIndex(10);
    }

    const filter = (data) => {
        setData(data);
        setOldData(data);
    }

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
                            <SelectBox
                                save = {filter}
                                type = {'Action History'}
                                reset = {reset}
                            />

                            {data.length > 0 ? 
                            (<table className={cx('table')}>
                                <thead>
                                    <tr>
                                        <th scope="col" className={cx('id')}>Stt</th>
                                        <th scope="col">Ssid</th>
                                        <th scope="col">
                                            <span>Type</span>
                                            <Tippy render={renderSelection} interactive placement="bottom"
                                                offset={[5, 5]}
                                            >
                                                <span><IoMdArrowDropdown className={cx('icon-arrow')}/></span>
                                            </Tippy>
                                        </th>
                                        <th scope="col">Action</th>
                                        <th scope="col">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderData}
                                </tbody>
                            </table>) : 
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

                        <div className={cx('container-divide')}>
                            {check ? renderDivider : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Action;