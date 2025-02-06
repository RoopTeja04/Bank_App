import React, { useState } from 'react';
import { motion } from 'framer-motion';

const UpdateAccount = ({ accounts_Data, setAccounts_Data }) => {
  const [searchAccountNumber, setSearchAccountNumber] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [edit, setEdit] = useState(false);
  const [updatedAccount, setUpdatedAccount] = useState(null);

  const handleSearchAccountNumber = (e) => {
    e.preventDefault();

    const account = accounts_Data.find(
      (account) => Number(account.AccountNumber) === Number(searchAccountNumber)
    );

    if (account) {
      setSearchResult(account);
      setUpdatedAccount({ ...account });
      setEdit(false);
    } else {
      setSearchResult('Account not found');
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateAccount = (e) => {
    e.preventDefault();

    setAccounts_Data((prevAccounts) =>
      prevAccounts.map((account) =>
        account.AccountNumber === updatedAccount.AccountNumber
          ? { ...updatedAccount }
          : account
      )
    );

    setSearchResult(updatedAccount);
    setEdit(false);
  };

  return (
    <div className='text-white relative top-14 flex flex-col items-center w-full'>
      <motion.h1
        className="text-3xl font-semibold tracking-wide"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Update Details
      </motion.h1>

      <motion.form
        onSubmit={handleSearchAccountNumber}
        className='flex flex-col w-full items-center justify-center mt-14 space-y-6'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <input
          type='text'
          placeholder='Enter Account Number'
          value={searchAccountNumber}
          onChange={(e) => setSearchAccountNumber(e.target.value)}
          minLength={12}
          className="text-xl px-4 py-2 w-1/4 border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider text-center"
        />
        <button
          type="submit"
          className='border-2 border-white w-1/6 h-12 text-2xl font-semibold tracking-wide rounded-xl backdrop-blur-lg transition-all duration-200 ease-linear cursor-pointer'
        >
          Search
        </button>
      </motion.form>

      {searchResult && (
        <>
          {typeof searchResult === 'string' ? (
            <motion.p
              className="text-red-500 mt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {searchResult}
            </motion.p>
          ) : edit ? (
            <>
              <motion.form
                className="grid grid-cols-2 mt-16 gap-x-11 gap-y-10"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <label className='flex flex-col'>
                  First Name
                  <input
                    type="text"
                    name="FirstName"
                    value={updatedAccount.FirstName}
                    onChange={handleUpdateChange}
                    required
                    className="text-xl px-4 py-2 w-full border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider text-center"
                  />
                </label>
                <label className='flex flex-col'>
                  Last Name
                  <input
                    type="text"
                    name="LastName"
                    value={updatedAccount.LastName}
                    onChange={handleUpdateChange}
                    required
                    className="text-xl px-4 py-2 w-full border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider text-center"
                  />
                </label>
                <label className='flex flex-col'>
                  Phone Number
                  <input
                    type="text"
                    name="PhoneNumber"
                    value={updatedAccount.PhoneNumber}
                    onChange={handleUpdateChange}
                    required
                    className="text-xl px-4 py-2 w-full border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider text-center"
                  />
                </label>
                <label className='flex flex-col'>
                  Email
                  <input
                    type="email"
                    name="EmailId"
                    value={updatedAccount.EmailId}
                    onChange={handleUpdateChange}
                    required
                    className="text-xl px-4 py-2 w-full border-b-2 bg-transparent focus:outline-none font-semibold focus:border-green-600 tracking-wider text-center"
                  />
                </label>
              </motion.form>
              <motion.button
                type="submit"
                disabled={
                  !updatedAccount.FirstName ||
                  !updatedAccount.LastName ||
                  !updatedAccount.PhoneNumber ||
                  !updatedAccount.EmailId
                }
                onClick={handleUpdateAccount} 
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Update
              </motion.button>
            </>
          ) : (
            <motion.div
              className="grid grid-cols-2 mt-16 gap-y-4 backdrop-blur-lg p-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className='text-base'>First Name: <span className="font-semibold text-2xl tracking-wide">{searchResult.FirstName}</span></p>
              <p className='text-base'>Last Name: <span className="font-semibold text-2xl tracking-wide">{searchResult.LastName}</span></p>
              <p className='text-base'>Phone Number: <span className="font-semibold text-2xl tracking-wide">{searchResult.PhoneNumber}</span></p>
              <p className='text-base'>E-Mail ID: <span className="font-semibold text-2xl tracking-wide">{searchResult.EmailId}</span></p>
              <motion.button
                onClick={() => setEdit(true)}
                className="bg-blue-400 text-black px-4 py-2 rounded-lg w-1/12 text-xl font-semibold hover:bg-blue-700 hover:text-white relative top-8 transition-all duration-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Edit
              </motion.button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default UpdateAccount;