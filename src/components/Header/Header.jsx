import React from 'react';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>F</div>
      <div className={styles.avatar}>A</div>
    </header>
  );
}

export default Header;