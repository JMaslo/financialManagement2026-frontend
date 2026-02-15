import React from 'react';
import styles from './App.module.css';
import Header from './components/Header/Header.jsx';
import BalanceCard from './components/BalanceCard/BalanceCard.jsx';
import AddTransaction from './components/AddTransaction/AddTransaction.jsx';
import TransactionList from './components/TransactionList/TransactionList.jsx';
import SummaryCards from './components/SummaryCards/SummaryCards.jsx';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      
      <div className={styles.topSection}>
        <BalanceCard balance="140 000,-" />
        <AddTransaction />
      </div>

      <TransactionList />

      <SummaryCards spent="25,000,-" income="89,000,-" />
    </div>
  );
}

export default App;
