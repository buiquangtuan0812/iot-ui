import React, { useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './Area.module.scss';

const cx = classNames.bind(styles);

const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const temp = [32, 30, 36, 40.5, 41, 38.4, 39.6];
const hum = [80.4, 78, 79.6, 80.3, 85, 88, 86.6];
const bright = [5, 4.5, 6.5, 7.5, 6.2, 6.1, 5.8];

function ExampleAreaChart() {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([
    { name: 'Mon', Temp: 32, Humidity: 80, Bright: 5 },
    { name: 'Tue', Temp: 34, Humidity: 88, Bright: 5.5 },
    { name: 'Wed', Temp: 36, Humidity: 90, Bright: 4 },
    { name: 'Thu', Temp: 31, Humidity: 87, Bright: 4.6 },
    { name: 'Fri', Temp: 31, Humidity: 91, Bright: 6 },
    { name: 'Sat', Temp: 33, Humidity: 79, Bright: 5.3 },
    { name: 'Sun', Temp: 29, Humidity: 80, Bright: 4.8 },
  ]);
  useEffect(() => {
    const interval = setTimeout(() => {
      const newData = [...data];
      newData.push({
        name: day[index],
        Temp: temp[index],
        Humidity: hum[index],
        Bright: bright[index]
      });
      newData.shift();
      setData(newData);
      if (index === 6) {
        setIndex(0);
      }
      else {
        setIndex(index + 1);
      }
    }, 2000);
    return () => clearTimeout(interval);
  }, [index, data]);

  return (
    <div className={cx('container_chart')}>
      <ResponsiveContainer width="100%" height={380}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis/>
          <Tooltip/>
          <CartesianGrid strokeDasharray="3 3" />
          <Area type="monotone" dataKey="Bright" stackId="1" stroke="#82ca9d" fill="#ece03d">
          </Area>
          <Area type="monotone" dataKey="Temp" stackId="1" stroke="#8884d8" fill="#8884d8">
          </Area>
          <Area type="monotone" dataKey="Humidity" stackId="1" stroke="#82ca9d" fill="#82ca9d">
          </Area>
        </AreaChart>
      </ResponsiveContainer>
      <h5>Biểu đồ nhiệt độ, độ ẩm, ánh sáng tuần qua.</h5>
    </div>
  );
};

export default ExampleAreaChart;
