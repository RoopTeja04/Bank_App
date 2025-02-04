import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom'
import CreateAccount from './Components/CreateAccount';
import Transactions from './Components/Transactions';
import UpdateAccount from './Components/UpdateAccount';
import Accounts from './Components/Accounts';
import BankLogo  from './assets/react.svg'
import AccountHistory from './Components/AccountHistory';

const MainApp = () => {

    const [ accounts_Data, setAccounts_Data ] = useState([]) || null;
        
    return (
        <div className='relative h-screen'>
            <div className='absolute inset-0 bg-main-poster bg-center w-full z-0 min-h-full'></div>
            <div className="absolute inset-0 bg-slate-900 bg-opacity-85 z-0 "></div>

            <div className='relative text-white font-All-Font tracking-wider'>
                <div className='flex flex-row items-center pt-4 px-8 justify-between'>
                    <div className='flex items-center cursor-pointer'>
                        <img className='h-12' src={BankLogo} alt='' />
                        <h1 className='text-4xl pl-2 font-semibold tracking-wide'>Bankera</h1>
                    </div>
                    <div className='flex pt-4 pr-6 space-x-10'>
                        <Link 
                            className='transition-all text-base duration-200 hover:underline hover:underline-offset-8 hover:text-green-500 transform' 
                            to="/"
                        >
                            Create Account
                        </Link>
                        <Link 
                            className='transition-all text-base duration-200 hover:underline hover:underline-offset-8 hover:text-green-500 transform' 
                            to="/transactions"
                        >
                            Tranactions
                        </Link>
                        <Link 
                            className='transition-all text-base duration-200 hover:underline hover:underline-offset-8 hover:text-green-500 transform' 
                            to="/update-account"
                        >
                            Update Account
                        </Link>
                        <Link 
                            className='transition-all text-base duration-200 hover:underline hover:underline-offset-8 hover:text-green-500 transform' 
                            to="/account-history"
                        >
                            Account History
                        </Link>
                        <Link 
                            className='transition-all text-base duration-200 hover:underline hover:underline-offset-8 hover:text-green-500 transform'
                            to="/accounts"
                        >
                            Accounts
                        </Link>
                    </div>
                </div>
            </div>

            <div>
                <Routes>
                    <Route path='/' element={<CreateAccount accounts_Data = { accounts_Data } setAccounts_Data = { setAccounts_Data } />} />
                    <Route path='/transactions' element={<Transactions accounts_Data = { accounts_Data } setAccounts_Data = { setAccounts_Data } />} />
                    <Route path='/update-account' element={<UpdateAccount accounts_Data = { accounts_Data } setAccounts_Data = { setAccounts_Data } />} />
                    <Route path='/account-history' element={<AccountHistory accounts_Data = { accounts_Data } />} />
                    <Route path='/accounts' element={<Accounts accounts_Data = { accounts_Data } />} />
                </Routes>
            </div>
        </div>
    )
}

export default MainApp