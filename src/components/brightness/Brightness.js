import classNames from "classnames/bind";
import styles from "./Bright.module.scss";

import {BiBrightness} from "react-icons/bi";

const cx = classNames.bind(styles);

function Brightness({brightness}) {
    return (
        <div className={cx('container')}>
            <div className={cx('description')}>
                <p className={cx('title')}>Độ sáng</p>
                <p className={cx('bright')}>{brightness}lux</p>
            </div>

            <div className={cx('img-des')}>
                <BiBrightness className={cx('icon')}/>
            </div>
        </div>
    );
}

export default Brightness;