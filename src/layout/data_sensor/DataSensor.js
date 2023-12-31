import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import styles from "./Datasensor.module.scss";
import Tippy from "@tippyjs/react/headless";
import {HiBars3} from "react-icons/hi2";
import {IoMdArrowDropdown, IoMdArrowDropup} from "react-icons/io";

import Nav from "../../components/navbar/Nav";
import SelectBox from "../../components/selectbox/SelectBox";

const cx = classNames.bind(styles);

function Datasensor() {
    const location = useLocation();
    const [keyValue, setKey] = useState('');
    const [data, setData] = useState([]);
    const [check, setCheck] = useState(false);
    const [endIndex, setEndIndex] = useState(0);
    const [column, setColumn] = useState('All');
    const [originData, setOriginData] = useState([]);
    const [sortTemp, setSortTemp] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const [dataCurrent, setDataCurrent] = useState([]);
    const [indexClicked, setIndexClicked] = useState(0);
    const [showHumidity, setShowHumidity] = useState(true);
    const [sortHumidity, setSortHumidity] = useState(false);
    const [sortDustLevel, setSortDustLevel] = useState(false);
    const [showBrightness, setShowBrightness] = useState(true);
    const [sortBrightness, setSortBrightness] = useState(false);
    const [showTemperature, setShowTemperature] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8008/data-sensor/get-all")
            .then(response => {
                let data = response.data;
                data = data.reverse();
                setData(data.reverse());
                setOriginData(data.reverse());
                if (data.length / 10 > 1) {
                    setEndIndex(10);
                    setCheck(true);
                }
                else {
                    setEndIndex(data.length);
                }
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
                {item.temperature ? 
                    <td>{item.temperature}</td> : ''
                }
                {item.humidity ? 
                    <td>{item.humidity}</td> : ''
                }
                {item.brightness ?
                    <td>{item.brightness}</td> : ''
                }
                {/* <td>{item.dustLevel}</td> */}
                <td>{time}</td>
            </tr>
        )
    });

    const renderDivider = data.slice(0, data.length / 10+1).map((item, index) => {
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

    const handleSortData = (type) => {
        let dataSensor = data;
        if (type === 'temperature') {
            if (sortTemp) {
                dataSensor.sort((a, b) => b.temperature - a.temperature);
                setSortTemp(false);
            }
            else {
                dataSensor.sort((a, b) => a.temperature - b.temperature);
                setSortTemp(true);
            }
        }
        else if (type === 'humidity') {
            if (sortHumidity) {
                dataSensor.sort((a, b) => b.humidity - a.humidity);
                setSortHumidity(false);
            }
            else {
                dataSensor.sort((a, b) => a.humidity - b.humidity);
                setSortHumidity(true);
            }
        }
        else if (type === 'dustLevel') {
            if (sortDustLevel) {
                dataSensor.sort((a, b) => b.dustLevel - a.dustLevel);
                setSortDustLevel(false);
            }
            else {
                dataSensor.sort((a, b) => a.dustLevel - b.dustLevel);
                setSortDustLevel(true);
            }
        }
        else {
            if (sortBrightness) {
                dataSensor.sort((a, b) => b.brightness - a.brightness);
                setSortBrightness(false);
            }
            else {
                dataSensor.sort((a, b) => a.brightness - b.brightness);
                setSortBrightness(true);
            }
        }
        setData(dataSensor);
    }

    const handleOnChangeSelect = (value) => {
        setColumn(value);
        if (value === 'temperature') {
            setShowHumidity(false);
            setShowTemperature(true);
            setShowBrightness(false);
        }
        else if (value === 'humidity') {
            setShowHumidity(true);
            setShowTemperature(false);
            setShowBrightness(false);
        }
        else if (value === 'brightness') {
            setShowHumidity(false);
            setShowTemperature(false);
            setShowBrightness(true);
        } 
        else {
            setShowHumidity(true);
            setShowTemperature(true);
            setShowBrightness(true);
            setData([...originData]);
            return;
        }
        const dataSensor = [...originData];
        const keys = ['ssid', value, 'time'];
        const newData = dataSensor.map(data => {
            const extractedData = {};
            keys.forEach(key => {
                extractedData[key] = data[key];
            });
            return extractedData;
        })
        setData(newData);
        setDataCurrent(newData);
    };

    const handleSearch = () => {
        const dataSensor = [...data];
        const newData = dataSensor.filter(sensor => {
            const keys = Object.keys(sensor);
            for (const key of keys) {
                if (String(sensor[key]).includes(keyValue)) {
                    return true;
                }
            }
            return false;
        });
        setData(newData);
    };

    const handleFilter = (data) => {
        setData(data);
        setDataCurrent(data);
    }
    

    return (
        <div className={cx('ctn')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('card')}>
                        <div className={cx('card-header')}>
                            <h4>Data Sensor</h4>
                            <div className={cx('search')}>
                                <select onChange={(e) => handleOnChangeSelect(e.target.value)}>
                                    <option value='All'>All</option>
                                    <option value='temperature'>Temperature</option>
                                    <option value='humidity'>Humidity</option>
                                    <option value='brightness'>Brightness</option>
                                </select>

                                <div className={cx('input-search')}>
                                    <input placeholder="Enter the key" type="text"
                                        aria-hidden="true" role="presentation" 
                                        onChange={(e) => setKey(e.target.value)}
                                    />
                                    <button onClick={handleSearch}>Search</button>
                                </div>
                            </div>
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
                                func = {handleFilter}
                                type = {'Data Sensor'}
                                reset = {reset}
                                column = {column}
                            />
                            {data.length > 0 ?
                            (<table className={cx('table')}>
                                <thead>
                                    <tr>
                                        <th scope="col" className={cx('id')}>Stt</th>
                                        <th scope="col">Ssid</th>
                                        {showTemperature ?
                                            <th scope="col">
                                                <span>Temperature</span>
                                                {!sortTemp ? 
                                                <span><IoMdArrowDropdown className={cx('icon-sort')} onClick={() => handleSortData('temperature')}/></span>
                                                : <span><IoMdArrowDropup className={cx('icon-sort')} onClick={() => handleSortData('temperature')}/></span>
                                                }
                                            </th> : ''
                                        }
                                        {showHumidity ? 
                                            <th scope="col">
                                                <span>Humidity</span>
                                                {!sortHumidity ?
                                                <span><IoMdArrowDropdown className={cx('icon-sort')} onClick={() => handleSortData('humidity')}/></span>
                                                : <span><IoMdArrowDropup className={cx('icon-sort')} onClick={() => handleSortData('humidity')}/></span>
                                                }
                                            </th> : ''
                                        }
                                        {showBrightness ?
                                            <th scope="col">
                                                <span>Brightness</span>
                                                {!sortBrightness ?
                                                <span><IoMdArrowDropdown className={cx('icon-sort')} onClick={() => handleSortData('brightness')}/></span>
                                                : <span><IoMdArrowDropup className={cx('icon-sort')} onClick={() => handleSortData('brightness')}/></span>
                                            }
                                            </th> : ''
                                        }
                                        {/* <th scope="col">
                                            <span>DustLevel</span>
                                            {!sortDustLevel ?
                                            <span><IoMdArrowDropdown className={cx('icon-sort')} onClick={() => handleSortData('dustLevel')}/></span>
                                            : <span><IoMdArrowDropup className={cx('icon-sort')} onClick={() => handleSortData('dustLevel')}/></span>
                                        }
                                        </th> */}
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

                        <div className={cx('container-divide')}>
                            {check ? renderDivider : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Datasensor;