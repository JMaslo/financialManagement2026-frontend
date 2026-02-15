import React from 'react';
import styles from './BalanceCard.module.css';

function BalanceCard({ balance }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Total balance</h2>
      <div className={styles.amount}>{balance}</div>
    </div>
  );
}

export default BalanceCard;