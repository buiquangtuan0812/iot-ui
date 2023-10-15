import classNames from "classnames/bind";
import axios from "axios";
import {useState } from "react";
import styles from "./SelectBox.module.scss";

import {Select} from "antd";
import {AiFillFilter} from "react-icons/ai";
import Tippy from "@tippyjs/react/headless";

const  cx = classNames.bind(styles);

function SelectBox(props) {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const handleOnMonth = (value) => {
        setMonth(value);
        const time = "2023-" + value + "-" + day;
        if (start && end) {
            const timeStart = time + " " + start + ":00:00";
            const timeEnd = time + " " + end + ":00:00";
            if (props.type === "Data Sensor") {
                axios.get('http://localhost:8008/data-sensor/filter-by-hour', {params: {start: timeStart, end: timeEnd}})
                    .then(res => props.func(res.data))
                    .catch(err => console.error(err));
            }
            else {
                axios.get('http://localhost:8008/action-history/filter-by-hour', {params: {start: timeStart, end: timeEnd}})
                    .then(res => props.save(res.data))
                    .catch(err => console.error(err));
            }
        }
        else {
            if (props.type === "Data Sensor") {
                axios.get('http://localhost:8008/data-sensor/filter-by-day', {params: {time: time}})
                    .then(res => props.func(res.data))
                    .catch(err => console.error(err));
            }
            else {
                axios.get('http://localhost:8008/action-history/filter-by-day', {params: {time: time}})
                    .then(res => props.save(res.data))
                    .catch(err => console.error(err));
            }
        }
    };

    const handleOnChangeDay = (value) => {
        setDay(value);
        const time = "2023-" + month + "-" + value;
        if (start && end) {
            const timeStart = time + " " + start + ":00:00";
            const timeEnd = time + " " + end + ":00:00";
            if (props.type === "Data Sensor") {
                axios.get('http://localhost:8008/data-sensor/filter-by-hour', {params: {start: timeStart, end: timeEnd}})
                    .then(res => props.func(res.data))
                    .catch(err => console.error(err));
            }
            else {
                axios.get('http://localhost:8008/action-history/filter-by-hour', {params: {start: timeStart, end: timeEnd}})
                    .then(res => props.save(res.data))
                    .catch(err => console.error(err));
            }
        }
        else {
            if (props.type === "Data Sensor") {
                axios.get('http://localhost:8008/data-sensor/filter-by-day', {params: {time: time}})
                    .then(res => props.func(res.data))
                    .catch(err => console.error(err));
            }
            else {
                axios.get('http://localhost:8008/action-history/filter-by-day', {params: {time: time}})
                    .then(res => props.save(res.data))
                    .catch(err => console.error(err));
            }
        }
    };

    const handleOnChangeStart = (value) => {
        setStart(value);
        const timeStart = "2023-" + month + "-" + day + " " + value + ":00:00";
        const timeEnd = "2023-" + month + "-" + day + " " + end + ":00:00";
        if (Number(value) <= Number(end)) {
            if (props.type === "Data Sensor") {
                axios.get('http://localhost:8008/data-sensor/filter-by-hour', {params: {start: timeStart, end: timeEnd}})
                    .then(res => props.func(res.data))
                    .catch(err => console.error(err));
            }
            else {
                axios.get('http://localhost:8008/action-history/filter-by-hour', {params: {start: timeStart, end: timeEnd}})
                    .then(res => props.save(res.data))
                    .catch(err => console.error(err));
            }
        };
    };

    const handleOnChangeEnd = (value) => {
        setEnd(value);
        const timeStart = "2023-" + month + "-" + day + " " + start + ":00:00";
        const timeEnd = "2023-" + month + "-" + day + " " + value + ":00:00";
        if (Number(value) >= Number(start)) {
            if (props.type === "Data Sensor") {
                axios.get('http://localhost:8008/data-sensor/filter-by-hour', {params: {start: timeStart, end: timeEnd}})
                    .then(res => props.func(res.data))
                    .catch(err => console.error(err));
            }
            else {
                axios.get('http://localhost:8008/action-history/filter-by-hour', {params: {start: timeStart, end: timeEnd}})
                    .then(res => props.save(res.data))
                    .catch(err => console.error(err));
            }
        };
    };

    const handleClick = () => {
        setDay('');
        setMonth('');
        setStart('');
        setEnd('');
        props.reset();
        if (props.type === 'Data Sensor') {
            axios.get('http://localhost:8008/data-sensor/get-all')
                .then (response => {
                    props.func(response.data);
                })
                .catch(err => console.log(err));
        }
        else {
            axios.get('http://localhost:8008/action-history/get-all')
                .then (response => {
                    props.save(response.data);
                })
                .catch(err => console.log(err));
        }
    };

    const renderTippy = (prop) => {
        return (
            <div>
                <span style={{color: '#fff'}}>Select All</span>
            </div>
        )
    }

    return (
        <div className={cx('container_select-box')}>
            <div className={cx('item-1')}>
                <span>Year:</span>
                <h3>2023</h3>
            </div>
            <div className={cx('item-2')}>
               
                <div className={cx('box')}>
                    <label>Month:</label>
                    <Select 
                        onChange={(value) => handleOnMonth(value)}
                        style={{width: 120}}
                        placeholder = "--Month--"
                        options={[
                        {
                            value: '01',label: '01'
                        },
                        {
                            value: '02',label: '02'
                        },
                        {
                            value: '03',label: '03'
                        },
                        {
                            value: '04',label: '04'
                        },
                        {
                            value: '05',label: '05'
                        },
                        {
                            value: '06', label: '06'
                        },
                        {
                            value: '07', label: '07'
                        },
                        {
                            value: '08', label: '08'
                        },
                        {
                            value: '09', label: '09'
                        },
                        {
                            value: '10', label: '10'
                        },
                        {
                            value: '11', label: '11'
                        },
                        {
                            value: '12', label: '12'
                        }
                        ]}
                    />
                </div>
                <div className={cx('box')}>
                    <label>Day:</label>
                    <Select 
                        onChange={(e) => handleOnChangeDay(e)}
                        style={{width: 120}}
                        placeholder = "--Day--"
                        options={[
                        {
                            value: '01',label: '01'
                        },
                        {
                            value: '02',label: '02'
                        },
                        {
                            value: '03',label: '03'
                        },
                        {
                            value: '04',label: '04'
                        },
                        {
                            value: '05',label: '05'
                        },
                        {
                            value: '06', label: '06'
                        },
                        {
                            value: '07', label: '07'
                        },
                        {
                            value: '08', label: '08'
                        },
                        {
                            value: '09', label: '09'
                        },
                        {
                            value: '10', label: '10'
                        },
                        {
                            value: '11', label: '11'
                        },
                        {
                            value: '12', label: '12'
                        },
                        {
                            value: '13', label: '13'
                        },
                        {
                            value: '14', label: '14'
                        },
                        {
                            value: '15', label: '15'
                        },
                        {
                            value: '16', label: '16'
                        },
                        {
                            value: '17', label: '17'
                        },
                        {
                            value: '18', label: '18'
                        },
                        {
                            value: '19', label: '19'
                        },
                        {
                            value: '20', label: '20'
                        },
                        {
                            value: '21', label: '21'
                        },
                        {
                            value: '22', label: '22'
                        },
                        {
                            value: '23', label: '23'
                        },
                        {
                            value: '24', label: '24'
                        },
                        {
                            value: '25', label: '25'
                        },
                        {
                            value: '26', label: '26'
                        },
                        {
                            value: '27', label: '27'
                        },
                        {
                            value: '28', label: '28'
                        },
                        {
                            value: '29', label: '29'
                        },
                        {
                            value: '30', label: '30'
                        },
                        {
                            value: '31', label: '31'
                        }
                        ]}
                    />
                </div>

                <div className={cx('box')}>
                    <label>From:</label>
                    <Select
                        onChange={(e) => handleOnChangeStart(e)}
                        style={{width: 120}}
                        placeholder = "--From--"
                        options={[
                            {
                                value: '00', label: '00'
                            },
                            {
                                value: '01',label: '01'
                            },
                            {
                                value: '02',label: '02'
                            },
                            {
                                value: '03',label: '03'
                            },
                            {
                                value: '04',label: '04'
                            },
                            {
                                value: '05',label: '05'
                            },
                            {
                                value: '06', label: '06'
                            },
                            {
                                value: '07', label: '07'
                            },
                            {
                                value: '08', label: '08'
                            },
                            {
                                value: '09', label: '09'
                            },
                            {
                                value: '10', label: '10'
                            },
                            {
                                value: '11', label: '11'
                            },
                            {
                                value: '12', label: '12'
                            },
                            {
                                value: '13', label: '13'
                            },
                            {
                                value: '14', label: '14'
                            },
                            {
                                value: '15', label: '15'
                            },
                            {
                                value: '16', label: '16'
                            },
                            {
                                value: '17', label: '17'
                            },
                            {
                                value: '18', label: '18'
                            },
                            {
                                value: '19', label: '19'
                            },
                            {
                                value: '20', label: '20'
                            },
                            {
                                value: '21', label: '21'
                            },
                            {
                                value: '22', label: '22'
                            },
                            {
                                value: '23', label: '23'
                            },
                        ]}
                    />
                </div>

                <div className={cx('box-to')}>
                    <label>To:</label>
                    <Select 
                        onChange={(e) => handleOnChangeEnd(e)}
                        style={{width: 120}}
                        placeholder = "--To--"
                        options={[
                        {
                            value: '00', label: '00'
                        },
                        {
                            value: '01',label: '01'
                        },
                        {
                            value: '02',label: '02'
                        },
                        {
                            value: '03',label: '03'
                        },
                        {
                            value: '04',label: '04'
                        },
                        {
                            value: '05',label: '05'
                        },
                        {
                            value: '06', label: '06'
                        },
                        {
                            value: '07', label: '07'
                        },
                        {
                            value: '08', label: '08'
                        },
                        {
                            value: '09', label: '09'
                        },
                        {
                            value: '10', label: '10'
                        },
                        {
                            value: '11', label: '11'
                        },
                        {
                            value: '12', label: '12'
                        },
                        {
                            value: '13', label: '13'
                        },
                        {
                            value: '14', label: '14'
                        },
                        {
                            value: '15', label: '15'
                        },
                        {
                            value: '16', label: '16'
                        },
                        {
                            value: '17', label: '17'
                        },
                        {
                            value: '18', label: '18'
                        },
                        {
                            value: '19', label: '19'
                        },
                        {
                            value: '20', label: '20'
                        },
                        {
                            value: '21', label: '21'
                        },
                        {
                            value: '22', label: '22'
                        },
                        {
                            value: '23', label: '23'
                        },
                        ]}
                    />
                </div>
                
                <Tippy render={renderTippy} interactive placement="bottom"
                    offset={[4, 2]}
                >
                    <div className={cx('filter-all')} onClick={handleClick}>
                        <AiFillFilter className={cx('icon')}/>
                    </div>
                </Tippy>
            </div>
        </div>
    );
};

export default SelectBox;