import { useRouter } from 'next/navigation';
import React, {useState} from 'react'
import { toast } from 'react-toastify';

const Login = () => {
  const [data, setData] = useState({ username: '', password: '' })
  const router = useRouter();

  const handleSubmit = async (e, type=false) => {
    e.preventDefault();
    const {username, password} = data
    let check = false
    if(type) check = true;
    else if(username && password) check = true

    if(check) {
      const res = await fetch('/api?login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, type }),
      });
      
      if (res.ok) {
        router.push('/home');
        setTimeout(() => toast.success('Login successful!'), 800)
        
      }else {
        const err = await res.json();
        toast.error(err.message || 'Login failed');
      }
    } else toast.error('Empty field!');
  };


  return (
    <>
      <nav className="container mx-auto p-4 pt-6 mb-4 flex items-center text-gray-700">
        <a className="text-2xl font-semibold cursor-pointer">Admin Panal</a>
      </nav>
      <main className="container mx-auto">
        <div className='p-10 mx-auto mt-12 max-w-[600px] bg-white flex flex-col items-center justify-center text-gray-700 runded-lg shadow-lg'>
          <div className="w-full mb-4">
            <h1 className="text-4xl font-semibold ">Welcome back.</h1>
          </div>
          <div className="w-full mb-6">
            <input className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500" type="text" placeholder="Email" onChange={(e) =>setData((prev) => ({ ...prev, username: e.target.value }))} />
            <input className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500" type="password" placeholder="Password" onChange={(e) =>setData((prev) => ({ ...prev, password: e.target.value }))} />

            <div className="flex items-center">
              <div className="w-1/2 flex items-center ">
                <button className='cursor-pointer' onClick={(e) =>handleSubmit(e, true)}>Demo Login!</button>
              </div>
              <button className="ml-auto w-1/2 bg-gray-800 text-white p-2 rounded font-semibold hover:bg-gray-900 cursor-pointer" type="submit" onClick={handleSubmit}>
                Log In
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Login;