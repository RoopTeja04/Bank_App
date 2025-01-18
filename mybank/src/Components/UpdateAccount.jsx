import React from 'react'

const UpdateAccount = ({ accounts_Data, setAccounts_Data }) => {
  return (
    <>
      <div className='text-white relative top-14 flex flex-col items-center w-full'>
        <h1>Update Details</h1>
        <div>
          <input
            type='text'
            placeholder='Enter Account Number' 
          />
        </div>
      </div>
    </>
  )
}

export default UpdateAccount