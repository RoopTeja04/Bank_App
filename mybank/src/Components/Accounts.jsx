import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Accounts = ({ accounts_Data }) => {
  const [savingCount, setSavingCount] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    const savingsAccount = accounts_Data.filter(Account => Account.AccountType === "savings");
    const currentAccount = accounts_Data.filter(Account => Account.AccountType === "current");

    setSavingCount(savingsAccount.length);
    setCurrentCount(currentAccount.length);
  }, [accounts_Data]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } },
  };

  const tableRowVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: { delay: index * 0.1 },
      delay:1,
    }),
  };

  return (
    <motion.div
      className="relative text-white flex flex-col items-center top-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="text-3xl font-semibold tracking-wide underline underline-offset-4 pb-2"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        Accounts of Bankura
      </motion.h1>
      <motion.div
        className="flex justify-around w-full max-w-4xl mt-6 mb-6"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <motion.div className="account-card bg-gradient-to-r from-green-400 to-green-600 px-6 py-4 rounded-2xl text-black cursor-pointer" variants={cardVariants}>
          <p className="font-medium text-lg">
            Savings Account: <span className="text-3xl font-bold">{savingCount}</span>
          </p>
        </motion.div>
        <motion.div className="account-card bg-gradient-to-r from-blue-400 to-blue-600 px-6 py-4 rounded-2xl text-black cursor-pointer" variants={cardVariants}>
          <p className="font-medium text-lg">
            Current Account: <span className="text-3xl font-bold">{currentCount}</span>
          </p>
        </motion.div>
        <motion.div className="account-card bg-gradient-to-r from-purple-400 to-purple-600 px-6 py-4 rounded-2xl text-black cursor-pointer" variants={cardVariants}>
          <p className="font-medium text-lg">
            Total Account: <span className="text-3xl font-bold">{accounts_Data.length}</span>
          </p>
        </motion.div>
      </motion.div>
      {accounts_Data.length === 0 ? (
        <motion.p
          className="text-red-600 text-3xl font-semibold mt-20 backdrop-blur-md py-4 px-8 border-4 border-red-800 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          No Accounts Has Been Created
        </motion.p>
      ) : (
        <motion.div
          className="overflow-x-auto w-full mt-4 pl-10 pr-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay:1 }}
        >
          <table className="table-auto border-collapse border border-gray-300 w-full text-center text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white uppercase text-xs tracking-wider">
                <th className="py-3 px-4 border border-gray-300 text-base">SL.NO</th>
                <th className="py-3 px-4 border border-gray-300 text-base">First Name</th>
                <th className="py-3 px-4 border border-gray-300 text-base">Last Name</th>
                <th className="py-3 px-4 border border-gray-300 text-base">Phone Number</th>
                <th className="py-3 px-4 border border-gray-300 text-base">E-Mail ID</th>
                <th className="py-3 px-4 border border-gray-300 text-base">Account Number</th>
                <th className="py-3 px-4 border border-gray-300 text-base">Account Type</th>
                <th className="py-3 px-4 border border-gray-300 text-base">Balance</th>
              </tr>
            </thead>
            <tbody>
              {accounts_Data.map((person, index) => (
                <motion.tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-transparent" : "bg-transparent"
                  } hover:bg-green-600 hover:text-black cursor-pointer transition duration-100`}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={tableRowVariants}
                >
                  <td className="py-3 px-4 border border-gray-300 text-base tracking-wide">{index + 1}</td>
                  <td className="py-3 px-4 border border-gray-300 text-base tracking-wide">{person.FirstName}</td>
                  <td className="py-3 px-4 border border-gray-300 text-base tracking-wide">{person.LastName}</td>
                  <td className="py-3 px-4 border border-gray-300 text-base tracking-wide">{person.PhoneNumber}</td>
                  <td className="py-3 px-4 border border-gray-300 text-base tracking-wide">{person.EmailId}</td>
                  <td className="py-3 px-4 border border-gray-300 text-base tracking-wide">{person.AccountNumber}</td>
                  <td className="py-3 px-4 border border-gray-300 text-base tracking-wide">{person.AccountType}</td>
                  <td className="py-3 px-4 border border-gray-300 text-base tracking-wide">₹ {Number(person.Balance).toLocaleString('hi-IN')} /-</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Accounts;