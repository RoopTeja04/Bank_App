import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';

const Transactions = () => {
  const defaultTransferValues = {
    FromAccountNumber: '',
    ToAccountNumber: '',
  };

  const defaultTransferAmount = {
    Amount: '',
  };

  const [transferAccountNumbers, setTransferAccountNumbers] = useState(defaultTransferValues);
  const [TransferAmount, setTransferAmount] = useState(defaultTransferAmount);
  const [visible, setVisible] = useState(false);

  const handleTransfer = async (e) => {
    e.preventDefault();

    const fromAccountNum = transferAccountNumbers.FromAccountNumber.trim();
    const toAccountNum = transferAccountNumbers.ToAccountNumber.trim();

    if (!/^\d{12}$/.test(fromAccountNum) || !/^\d{12}$/.test(toAccountNum)) {
      alert("Invalid Account Number. Please enter a valid 12-digit number.");
      return;
    }
    if (fromAccountNum === toAccountNum) {
      alert('From and To Account Numbers are the same. Transfer is not allowed.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/accounts/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fromAccountNum, toAccountNum }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }

      alert('Accounts validated. You can proceed with the transfer.');
      setVisible(true);
    } catch (error) {
      console.error("Error during validation:", error);
      alert("Something went wrong! Please try again later.");
    }
  };

  const handleAmount = async (e) => {
    e.preventDefault();

    if (!/^\d+(\.\d{1,2})?$/.test(TransferAmount.Amount) || TransferAmount.Amount <= 0) {
      alert('Enter a valid transfer amount (up to two decimal places)!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromAccountNum: transferAccountNumbers.FromAccountNumber,
          toAccountNum: transferAccountNumbers.ToAccountNumber,
          amount: TransferAmount.Amount,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }

      alert('Transfer Successful!');
      setTransferAccountNumbers(defaultTransferValues);
      setTransferAmount(defaultTransferAmount);
      setVisible(false);
    } catch (error) {
      console.error("Error during transfer:", error);
      alert("Something went wrong! Please try again later.");
    }
  };

  const SwapAccountNumber = () => {
    setTransferAccountNumbers(prev => ({
      FromAccountNumber: prev.ToAccountNumber,
      ToAccountNumber: prev.FromAccountNumber
    }));
  };

  return (
    <div className="relative text-white flex flex-col items-center justify-center top-14 w-screen">
      <h1 className="text-3xl font-semibold tracking-wide">Money Transfer</h1>
      <div className="flex flex-row justify-center relative top-16 space-x-20 w-full">
        <motion.input
          type="text"
          value={transferAccountNumbers.FromAccountNumber}
          onChange={(e) => setTransferAccountNumbers(prev => ({ ...prev, FromAccountNumber: e.target.value }))}
          placeholder="From Account Number"
          maxLength={12}
          className="text-xl px-4 py-2 w-1/4 border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider"
          whileFocus={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <SwapHorizRoundedIcon
          style={{fontSize:"48px"}}
          className='relative top-1.5 cursor-pointer border-2 border-white rounded-full p-2'
          onClick={SwapAccountNumber}
        />
        <motion.input
          type="text"
          value={transferAccountNumbers.ToAccountNumber}
          onChange={(e) => setTransferAccountNumbers(prev => ({ ...prev, ToAccountNumber: e.target.value }))}
          placeholder="To Account Number"
          maxLength={12}
          className="text-xl px-4 py-2 w-1/4 border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider"
          whileFocus={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <motion.button
        type="button"
        onClick={handleTransfer}
        className="relative top-32 h-14 border-white border-2 w-1/6 cursor-pointer text-xl font-bold tracking-wider rounded-xl px-6 py-2 bg-blue-700 text-white hover:bg-blue-500 hover:text-black hover:border-black transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.1 }}
        disabled={visible}
      >
        Search Account
      </motion.button>
      {visible && (
        <motion.div
          className="flex flex-col relative items-center top-44 py-2 w-screen"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <motion.input
            type="text"
            value={TransferAmount.Amount}
            onChange={(e) => setTransferAmount({ ...TransferAmount, Amount: e.target.value })}
            placeholder="Enter the Amount ₹ 1 /-"
            className="text-xl px-4 py-2 w-1/4 border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider"
            whileFocus={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <motion.button
            type="button"
            onClick={handleAmount}
            className="h-14 relative top-10 bg-green-600 w-1/6 text-xl font-bold text-black tracking-wider rounded-xl hover:bg-green-900 cursor-pointer transition duration-500"
            whileHover={{ scale: 1.1 }}
          >
            Transfer Amount
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Transactions;