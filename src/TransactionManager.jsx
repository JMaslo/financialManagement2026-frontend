import { useState, useEffect } from "react";

function TransactionManager() {
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState(['']);
    const [description, setDescription] = useState(['']);
    const [type, setType] = useState(['EXPENSE']);
    const [date, setDate] = useState(['']);


    useEffect(() => {
        fetchTransactions();
    }, []);  
    
    const fetchTransactions = () => {
        fetch('http://localhost:8080/api/transactions')
            .then(response => response.json())
            .then(data => setTransactions(data))
            .catch(error => console.error("Error fetching transactions:", error));
    }

    const newTransaction = (e) => {
        e.preventDefault();

        // const newTransaction: amount, description, type, date (useState for each)
        const newTransaction = {
            amount: parseFloat(amount),
            description: description,
            type: type,
            date: date
        };

        // Post fetch:
        fetch('http://localhost:8080/api/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTransaction)
        })
        .then(response => response.json())
        .then(savedTransaction => {
            setTransactions([...transactions, savedTransaction]);

            setAmount('');
            setDescription('');
            setType('');
            setDate('');

            alert("Transaction added!")
        })
        .catch(error => {
            console.error("Error when creating new transaction", error);
            alert("Couldnt create a new transaction!");
        });
            
    }

    /* const transactions = [
        {
          id: 1,
          date: '23 April',
          category: 'Salary',
          amount: '+85,000',
          status: 'Completed',
          isPositive: true
        },
        {
          id: 2,
          date: '18 April',
          category: 'Dining',
          amount: '-58',
          status: 'Pending',
          isPositive: false
        },
        {
          id: 3,
          date: '15 April',
          category: 'Netflix',
          amount: '-259',
          status: 'Completed',
          isPositive: false
        }
      ]; */

    const handleDelete = (id) => {
        if (!window.confirm('Opravdu chceš smazat tuto transakci?')) {
            return;
        }

        fetch(`http://localhost:8080/api/transactions/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            // Odstraň smazanou transakci ze state
            setTransactions(transactions.filter(t => t.id !== id));
            alert('Transakce smazána!');
        })
        .catch(error => {
            console.error('Chyba při mazání:', error);
            alert('Nepodařilo se smazat transakci!');
        });
    };

    return (
        <div>
            
        </div>
    );


}

export default TransactionManager;