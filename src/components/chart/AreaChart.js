import React from 'react';
import classNames from 'classnames/bind';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './Area.module.scss';

const cx = classNames.bind(styles);

const data = [
    { name: 'Mon', Temp: 32, Humidity: 80, Bright: 5 },
    { name: 'Tues', Temp: 34, Humidity: 88, Bright: 5.5 },
    { name: 'Wenes', Temp: 36, Humidity: 90, Bright: 4 },
    { name: 'Thur', Temp: 31, Humidity: 87, Bright: 4.6 },
    { name: 'Fri', Temp: 31, Humidity: 91, Bright: 6 },
    { name: 'Statur', Temp: 33, Humidity: 79, Bright: 5.3 },
    { name: 'Sun', Temp: 29, Humidity: 80, Bright: 4.8 },
];

const ExampleAreaChart = () => {
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
