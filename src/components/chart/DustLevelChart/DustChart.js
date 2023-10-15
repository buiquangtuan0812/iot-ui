import React, { useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './DustChart.module.scss';

const cx = classNames.bind(styles);

function DustChartComponent(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (props.data !== null) {
      const newData = [...data];
      newData.push({
        name: "Time",
        DustLevel: props.data,
      });
      if (newData.length === 5) {
        newData.shift();
      }
      setData(newData);
    }
  }, [props]);

  return (
    <div className={cx('container_chart')}>
      <ResponsiveContainer width="100%" height={360}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis/>
          <Tooltip/>
          <CartesianGrid strokeDasharray="3 3" />
          <Area type="monotone" dataKey="DustLevel" stackId="1" stroke="#82ca9d" fill="#ece03d">
          </Area>
        </AreaChart>
      </ResponsiveContainer>
      <h6>Biểu đồ độ bụi.</h6>
    </div>
  );
};

export default DustChartComponent;
