import classNames from "classnames/bind";
import styles from "./Temperature.module.scss";

import {BsFillCloudSunFill, BsFillSunFill} from "react-icons/bs";
import {AiFillCloud} from "react-icons/ai";

const cx = classNames.bind(styles);

function Item({temp}) {

    return (
        <div className={cx(temp < 27 ? 'container_item-cloud' : (temp >= 34 ? 'container_item-hot' : 'container_item-sun'))}>
            <div className={cx('description')}>
                <p className={cx('title')}>Nhiệt độ</p>
                <p className={cx('temp')}>{temp}°C</p>
                </div>
            <div className={cx('img-des')}>
                {temp < 27 ? <AiFillCloud className={cx('icon-cloud')}/> : (temp >=34 ? <BsFillSunFill className={cx('icon-hot')}/>
                    : <BsFillCloudSunFill className={cx('icon-sun')}/>
                )}
            </div>
        </div>
    );
}

export default Item;