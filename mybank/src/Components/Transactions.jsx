import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';

const Transactions = ({ accounts_Data, setAccounts_Data }) => {
  const defaultTransferValues = {
    FromAccountNumber: '',
    ToAccountNumber: '',
  };

  const defaultTransferAmount = {
    Amount: '',
  };

  const [transferAccountNumbers, setTransferAccountNumbers] = useState(defaultTransferValues);
  const [TransferAmount, setTransferAmount] = useState(defaultTransferAmount);
  const [fromAccount, setFromAccount] = useState(null);
  const [toAccount, setToAccount] = useState(null);
  const [visible, setVisible] = useState(false);

  const handleTransfer = (e) => {
    e.preventDefault();

    const fromAccountNum = Number(transferAccountNumbers.FromAccountNumber.trim());
    const toAccountNum = Number(transferAccountNumbers.ToAccountNumber.trim());

    const Fromnumber = String(fromAccountNum);
    const ToNumber = String(toAccountNum);

    if (fromAccountNum === toAccountNum) {
      alert('From and To Account Numbers are the same. Transfer is not allowed.');
      return;
    }
    else if ( Fromnumber.length !== 12 ) {
      alert(`(${fromAccountNum}) InValid Number. Please check the number once!...`)
    }
    else if( ToNumber.length !== 12 ){
      alert(`${toAccountNum} InValid Number. Please check the number once!...`)
    }

    const findFromAccountNumber = accounts_Data.find(
      (account) => Number(account.AccountNumber) === fromAccountNum
    );
    const findToAccountNumber = accounts_Data.find(
      (account) => Number(account.AccountNumber) === toAccountNum
    );

    if (!findFromAccountNumber) {
      alert(`From Account Number (${fromAccountNum}) doesn't exist!`);
      return;
    }

    if (!findToAccountNumber) {
      alert(`To Account Number (${toAccountNum}) doesn't exist!`);
      return;
    }

    setFromAccount(findFromAccountNumber);
    setToAccount(findToAccountNumber);
    alert('Accounts validated. You can proceed with the transfer.');
    setVisible(true);
  };

  const handleAmount = (e) => {
    e.preventDefault();

    if (!TransferAmount.Amount || isNaN(TransferAmount.Amount) || TransferAmount.Amount <= 0) {
      alert('Enter a valid transfer amount!');
      return;
    }

    if (fromAccount && toAccount) {
      if (Number(fromAccount.Balance) >= Number(TransferAmount.Amount)) {
        const updatedAccounts = [...accounts_Data];

        const fromAccountIndex = updatedAccounts.findIndex(
          (account) => account.AccountNumber === fromAccount.AccountNumber
        );
        const toAccountIndex = updatedAccounts.findIndex(
          (account) => account.AccountNumber === toAccount.AccountNumber
        );

        updatedAccounts[fromAccountIndex].Balance =
          Number(updatedAccounts[fromAccountIndex].Balance) - Number(TransferAmount.Amount);
        updatedAccounts[toAccountIndex].Balance =
          Number(updatedAccounts[toAccountIndex].Balance) + Number(TransferAmount.Amount);

        const transactionTime = new Date().toLocaleString();
        const fromTransactionDetails = {
          DateTime: transactionTime,
          Amount: TransferAmount.Amount,
          Type: 'Debit',
        };

        const toTransactionDetails = {
          DateTime: transactionTime,
          Amount: TransferAmount.Amount,
          Type: 'Credit',
        };

        updatedAccounts[fromAccountIndex].Transactions = [
          ...(updatedAccounts[fromAccountIndex].Transactions || []),
          fromTransactionDetails,
        ];
        updatedAccounts[toAccountIndex].Transactions = [
          ...(updatedAccounts[toAccountIndex].Transactions || []),
          toTransactionDetails,
        ];

        setAccounts_Data(updatedAccounts);

        alert('Transfer Successful!');

        setTransferAccountNumbers(defaultTransferValues);
        setTransferAmount(defaultTransferAmount);
        setFromAccount(null);
        setToAccount(null);
      } else {
        alert('Insufficient balance in From Account!');
      }
    } else {
      alert('Search accounts before transferring the amount.');
    }
  };

  const SwapAccountNumber = () => {
    setTransferAccountNumbers({
      FromAccountNumber: transferAccountNumbers.ToAccountNumber,
      ToAccountNumber: transferAccountNumbers.FromAccountNumber,
    });
  };

  return (
    <>
      <div className="relative text-white flex flex-col items-center justify-center top-14 w-screen">
        <h1 className="text-3xl font-semibold tracking-wide">Money Transfer</h1>
        <div className="flex flex-row justify-center relative top-16 space-x-20 w-full">
          <motion.input
            type="text"
            value={transferAccountNumbers.FromAccountNumber}
            onChange={(e) =>
              setTransferAccountNumbers({
                ...transferAccountNumbers,
                FromAccountNumber: e.target.value,
              })
            }
            placeholder="From Account Number"
            className="text-xl px-4 py-2 w-1/4 border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider"
            whileFocus={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <SwapHorizRoundedIcon
            className="relative top-1 text-6xl border-4 border-white rounded-full px-2 cursor-pointer"
            fontSize=''
            onClick={SwapAccountNumber}
          />
          <motion.input
            type="text"
            value={transferAccountNumbers.ToAccountNumber}
            onChange={(e) =>
              setTransferAccountNumbers({
                ...transferAccountNumbers,
                ToAccountNumber: e.target.value,
              })
            }
            placeholder="To Account Number"
            className="text-xl px-4 py-2 w-1/4 border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider"
            whileFocus={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <motion.button
          type="button"
          onClick={handleTransfer}
          className="relative top-32 h-14 border-white border-2 w-1/6 cursor-pointer text-xl font-bold tracking-wider rounded-xl px-6 py-2 bg-blue-700 text-white hover:bg-blue-500 hover:text-black hover:border-black transition duration-300"
          whileHover={{ scale: 1.1 }}
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
              onChange={(e) =>
                setTransferAmount({ ...TransferAmount, Amount: e.target.value })
              }
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
    </>
  );
};

export default Transactions;