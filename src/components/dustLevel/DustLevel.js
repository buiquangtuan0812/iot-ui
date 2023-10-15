import classNames from "classnames/bind";
import styles from "./DustLevel.module.scss";

import {GiDustCloud} from "react-icons/gi";

const cx = classNames.bind(styles);

function DustLevel({dustLevel}) {
    return (
        <div className={cx('container')}>
            <div className={cx('description')}>
                <p className={cx('title')}>Độ bụi (mg/m^3)</p>
            </div>
            <div className={cx('img-des')}>
                <p className={cx('dustlevel')}>{dustLevel}</p>
                <GiDustCloud className={cx('icon')}/>
            </div>
        </div>
    );
}


export default DustLevel;