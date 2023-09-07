import classNames from "classnames/bind";
import styles from "./Nav.module.scss";
import { Link } from "react-router-dom";

import {CgProfile} from "react-icons/cg";
import {GrHistory} from "react-icons/gr";
import {MdOutlineSensors} from "react-icons/md";

const cx = classNames.bind(styles);

function Nav() {
    return (
        <div className={cx('container__nav')}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="rgba(255, 255, 255, 1)"
                viewBox="0 0 24 8"
                width="1em"
                height="1em"
                className={cx('tiktok-znnspw-StyledTopArrow')}
            >
                <path d="M0 8c7 0 10-8 12-8s5 8 12 8z"></path>
            </svg>
            <div className={cx('container__item')}>
                <Link to = "/profile">
                    <div className={cx('nav-item')}>
                        <div>
                            <CgProfile className={cx('icon')}/>
                            Profile
                        </div>
                    </div>
                </Link>

                <div className={cx('nav-item')}>
                    <div>
                        <MdOutlineSensors className={cx('icon')}/>
                        Data Sensors
                    </div>
                </div>

                <div className={cx('nav-item')}>
                    <div>
                        <GrHistory className={cx('icon')}/>
                        Action History
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Nav;