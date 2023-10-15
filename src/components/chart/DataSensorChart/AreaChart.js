import React, { useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './Area.module.scss';

const cx = classNames.bind(styles);

function AreaChartComponent(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const dataSensor = props.data;
    if (dataSensor !== '') {
      const newData = [...data];
      newData.push({
        name: dataSensor["time"].slice(10, dataSensor["time"].length) || "Now",
        Temp: dataSensor["temp"],
        Humidity: dataSensor["humidity"],
        Bright: dataSensor["bright"]
      });
      if (newData.length === 8) {
        newData.shift();
      }
      setData(newData);
    }
  }, [props.data]);

  return (
    <div className={cx('container_chart')}>
      <ResponsiveContainer width="100%" height={360}>
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
      <h6>Biểu đồ nhiệt độ, độ ẩm, ánh sáng.</h6>
    </div>
  );
};

export default AreaChartComponent;
