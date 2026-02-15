import React from 'react';
import styles from './SummaryCards.module.css';

function SummaryCards({ spent, income }) {
  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${styles.spentCard}`}>
        <h3 className={styles.title}>Spent per month</h3>
        <div className={styles.amount}>{spent}</div>
      </div>
      
      <div className={`${styles.card} ${styles.incomeCard}`}>
        <h3 className={styles.title}>Income per month</h3>
        <div className={styles.amount}>{income}</div>
      </div>
    </div>
  );
}

export default SummaryCards;    