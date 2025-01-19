import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const AccountHistory = ({ accounts_Data }) => {
  const [searchNumber, setSearchNumber] = useState('');
  const [foundedAccount, setFoundedAccount] = useState([]);
  const [visible, setVisible] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    const foundAccount = accounts_Data.find(
      (account) => Number(account.AccountNumber) === Number(searchNumber)
    );

    setFoundedAccount(foundAccount ? [foundAccount] : []);
    setSearchNumber('');
    setVisible(true);
  };

  return (
    <>
      <motion.div
        className="relative flex flex-col items-center text-white w-screen top-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1}}
      >
        <h1 className="text-3xl font-semibold tracking-wide">Account History</h1>
        <div className="w-screen flex flex-col justify-center items-center relative top-10">
          <input
            type="text"
            placeholder="Enter the Account Number"
            value={searchNumber}
            onChange={(e) => setSearchNumber(e.target.value)}
            className="text-xl px-4 py-2 w-1/4 border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider text-center"
          />
          <button
            onClick={handleSearch}
            className="w-1/4 h-12 bg-yellow-500 text-black font-semibold text-2xl mt-12 rounded-lg hover:border-2 hover:bg-yellow-800 hover:border-white transition-all duration-200"
          >
            Search Account
          </button>

          {visible && foundedAccount.length > 0 && (
            <motion.div
              className="relative top-8 border-white backdrop-blur-md grid grid-cols-2 gap-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {foundedAccount.map((account, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col justify-center items-center py-10"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl font-semibold tracking-widest pb-2 uppercase">{`${account.FirstName} ${account.LastName}`}</h1>
                  <span className="text-lg font-light tracking-wider py-2">
                    Account Number:{' '}
                    <span className="text-3xl font-medium">{account.AccountNumber}</span>
                  </span>
                  <div className="grid grid-cols-2 gap-6 gap-x-14 mt-6 ml-10">
                    <span className="text-base font-light tracking-wider pb-2">
                      Account Type:{' '}
                      <span className="text-2xl font-medium"> {account.AccountType}</span>
                    </span>
                    <span className="text-base font-light tracking-wider pb-2">
                      Balance:{' '}
                      <span className="text-2xl font-medium">
                        ₹ {Number(account.Balance).toLocaleString('hi-IN')} /-
                      </span>
                    </span>
                    <span className="text-base font-light tracking-wider pb-2">
                      E-Mail Id:{' '}
                      <span className="text-2xl font-medium">{account.EmailId}</span>
                    </span>
                    <span className="text-base font-light tracking-wider pb-2">
                      Phone Number:{' '}
                      <span className="text-2xl font-medium">{account.PhoneNumber}</span>
                    </span>
                  </div>

                  {account.Transactions && account.Transactions.length > 0 ? (
                    <div className="mt-6">
                      <h2 className="text-2xl font-bold underline mb-4 text-center">
                        Transaction History
                      </h2>
                      <ul className="bg-gray-800 p-4 rounded-md shadow-md text-white">
                        {account.Transactions.map((transaction, idx) => (
                          <li
                            key={idx}
                            className="flex justify-between px-4 py-6 border-b border-gray-600 last:border-none"
                          >
                            <span className="text-base font-medium text-gray-300 tracking-wider">
                              {transaction.DateTime}
                            </span>{' '}
                            -
                            <span className="text-base">
                              {transaction.Type === 'Debit' ? (
                                <p className="text-red-600 font-semibold flex flex-row items-center justify-center">
                                  <ArrowUpwardIcon />
                                  {`${transaction.Type}`}
                                </p>
                              ) : (
                                <p className="text-green-600 font-semibold">
                                  <ArrowDownwardIcon />
                                  {`${transaction.Type}`}
                                </p>
                              )}
                            </span>{' '}
                            -
                            <span className="text-base font-medium text-green-500">
                              {transaction.Type === 'Debit' ? (
                                <p className="text-red-600 font-semibold">
                                  ₹ {Number(transaction.Amount).toLocaleString('hi-IN')} /-
                                </p>
                              ) : (
                                <p className="text-green-600 font-semibold">
                                  ₹ {Number(transaction.Amount).toLocaleString('hi-IN')} /-
                                </p>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-red-600 text-2xl font-bold mt-0 backdrop-blur-md mx-24 py-2 border-4 border-red-400 rounded-lg text-center mb-6">
                      No Transactions Done
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {visible && foundedAccount.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-red-600 text-4xl font-bold mt-20 backdrop-blur-md py-4 px-8 border-4 border-red-400 rounded-lg">
                No account found with this Account number.
              </h1>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default AccountHistory;