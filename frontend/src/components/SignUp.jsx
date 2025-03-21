import React, { useState } from 'react'

const SignUp = () => {
    const [userName,setUserName] = useState('');
    const [userEmail,setUserEmail] = useState('');
    const [userPassword,setUserPassword] = useState('');
    const [error,setError] = useState('');
    const clearAllFields = ()=>{
        setUserName('')
        setUserEmail('')
        setUserPassword('')
    }

    const handleSignUp = async () => {
        setError('');
        if (!userName || !userEmail || !userPassword) {
          setError('Missing fields!');
          return;
        }
      
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, userEmail, userPassword }),
          });
      
          const data = await response.json();
          if (response.ok) {
            clearAllFields();
            setError('Signup successfull')
          } else {
            setError(data.message || 'Signup failed');
          }
        } catch (error) {
          console.error('Signup error:', error);
          setError('An error occurred during signup.');
        }
      };

  return (
    <div className='flex flex-col items-center'>
        <div className='flex flex-col mb-3'>
            <span className='text-s uppercase bg-blue-700 text-transparent bg-clip-text m-2'>Username</span>
            <input className='text-l p-2 m-2 border-2 border-amber-50 rounded-md' type="text" 
                placeholder='Enter Username'
                id='username'
                value={userName}
                onChange={(e)=>{
                    setUserName(e.target.value)
                }}
            />
        </div>
        <div className='flex flex-col mb-3'>
            <span className='text-s uppercase bg-blue-700 text-transparent bg-clip-text m-2'>Email</span>
            <input className='text-l p-2 m-2 border-2 border-amber-50 rounded-md' type="text" 
                placeholder='Enter email'
                id='email'
                value={userEmail}
                onChange={(e)=>{
                    setUserEmail(e.target.value)
                }}
            />
        </div>
        <div className='flex flex-col mb-3'>
            <span className='text-s uppercase bg-blue-700 text-transparent bg-clip-text m-2'>Password</span>
            <input className='text-l p-2 m-2 border-2 border-amber-50 rounded-md' 
                type="password"
                placeholder='Enter Password'
                id='password'
                value={userPassword}
                onChange={(e)=>{
                    setUserPassword(e.target.value)
                }}
            />
        </div>
        {error && <span className='text-red-600'>{error}</span>}
        <div className='flex flex-col items-center p-2 m-2 mb-3'>
            <button 
                className='text-xl bg-blue-600 uppercase border-2 border-amber-50 rounded-xl p-2 hover: hover:bg-blue-800 cursor-pointer '
                type='button'
                onClick={handleSignUp}
            >
                Sign Up
            </button>
        </div>
    </div>
  )
}

export default SignUp