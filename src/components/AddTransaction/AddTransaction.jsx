import { useEffect, useState } from 'react';
import styles from './AddTransaction.module.css';

function AddTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('EXPENSE');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    fetch('http://localhost:8080/api/transactions')
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.error("Error fetching transactions", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('State values:');
    console.log('amount:', amount);
    console.log('description:', description);
    console.log('type:', type);
    console.log('date:', date);

    if (!amount || !description || !date) {
      alert('Fill all fields!');
      return;
    }

    const newTransaction = {
      amount: parseFloat(amount),
      description: description,
      type: type,
      date: date
    };

    console.log('Sending to backend:', newTransaction);

    fetch('http://localhost:8080/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTransaction)
    })
    .then(response => {
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(savedTransaction => {
      console.log('✅ Saved:', savedTransaction);
      setTransactions([...transactions, savedTransaction]);

      setAmount('');
      setDescription('');
      setType('EXPENSE');
      setDate('');

      alert('Transaction successfully added!');

      window.location.reload();
    })
    .catch(error => {
      console.error('❌ Error:', error);
      alert('Could not add new transaction: ' + error.message);
    });
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Add transaction</h2>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Amount</label>
          <input 
            type="number" 
            step="0.01"
            className={styles.input} 
            placeholder="100"
            value={amount}
            onChange={(e) => {
              console.log('Amount changed:', e.target.value);
              setAmount(e.target.value);
            }}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Description</label>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="School expense"
            value={description}
            onChange={(e) => {
              console.log('Description changed:', e.target.value);
              setDescription(e.target.value);
            }}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Type</label>
          <select 
            className={styles.input}
            value={type}
            onChange={(e) => {
              console.log('Type changed:', e.target.value);
              setType(e.target.value);
            }}
            required
          >
            <option value="EXPENSE">Vydaj</option>
            <option value="INCOME">Prijem</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Date</label>
          <input 
            type="date" 
            className={styles.input}
            value={date}
            onChange={(e) => {
              console.log('Date changed:', e.target.value);
              setDate(e.target.value);
            }}
            required
          />
        </div>

        <button type="submit" className={styles.addButton}>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;