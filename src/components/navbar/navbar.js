import React from 'react';
import styles from './navbar.modules.css';

const Navbar = () => {
    return (
        <div>
            <ul className={styles.ulAlign}>
                <li className={styles.liEle} id={styles.logo}><a href="/">Bus-Booking</a></li>
                <li className={styles.liEle}><a href="/">Home</a></li>
                <li className={styles.liEle}><a href="/">Contact</a></li>
                <li className={styles.liEle}><a href="/">About</a></li>
            </ul>
        </div>
    );
};

export default Navbar;