import React from 'react';
import styles from './TransactionList.module.css';
import { useEffect, useState } from 'react';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    fetch('http://localhost:8080/api/transactions')
    .then(response => response.json())
    .then(data => setTransactions(data))
    .catch(error => console.error("Error fetching transactions: ", error))
  }  

  const deleteTransaction = (id) => {
    if (window.confirm('Opravdu chceš smazat tuto transakci?')) {
      // TODO: Fetch DELETE request na backend
      fetch(`http://localhost:8080/api/transactions/${id}`, {
        method: 'DELETE'
      })
      .then(() => {
        setTransactions(transactions.filter(t => t.id !== id));
        alert("Transaction succesfully deleted!");
        // window.location.reload();
      })
      .catch(error => {
        console.error("Could not delete this transaction", error);
        alert("Could not delete this transaction!");
      })
      console.log('Mažu transakci s ID:', id);      
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Transactions</h2>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.headerCell}>Date</th>
              <th className={styles.headerCell}>Description</th>
              <th className={styles.headerCell}>Amount</th>
              <th className={styles.headerCell}>Status</th>
              <th className={styles.headerCell}>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className={styles.row}>
                <td className={styles.cell}>{transaction.date}</td>
                <td className={styles.cell}>{transaction.category}</td>
                <td className={`${styles.cell} ${transaction.isPositive ? styles.positive : styles.negative}`}>
                  {transaction.amount}
                </td>
                <td className={styles.cell}>
                  <span className={`${styles.status} ${transaction.status === 'Completed' ? styles.statusCompleted : styles.statusPending}`}>
                    {transaction.status}
                  </span>
                </td>
                <td className={styles.cell}>
                  <button 
                    className={styles.deleteBtn}
                    onClick={() => deleteTransaction(transaction.id)}
                    aria-label="Delete transaction"
                  >
                    <svg 
                      className={styles.deleteIcon} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionList;