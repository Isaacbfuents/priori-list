import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'

function RegisterPage() {

    const navigate = useNavigate(); // Hook para redireccionar
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate that all inputs have information
        if( name === '' || lastName === '' || email === '' || password === '' ) {
            console.log('Favor de llenar todos los campos')
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, { name, lastName, email, password }, { withCredentials: true })

            navigate('/auth/verify-email', {state: { email }})
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="relative min-h-screen">
            {/* Background */}
            <div className='absolute inset-0 flex min-h-screen'>
                <div className='bg-gray-100 w-[55%] h-full'></div>
                <div className='bg-primary w-[45%] h-full'></div>
            </div>

            {/* Content */}
            <div className="relative">
                <div className="flex">
                    <div className="w-[55%] min-h-screen flex justify-center items-center">
                        <div className="bg-white shadow-xl p-10 m-10">
                            <h2 className="text-4xl font-semibold text-secondary text-center">Create an Account!</h2>
                            <p className="text-lg font-medium text-black mt-2 text-center">Sign up now and take control of your tasks effortlessly.</p>
                            <div className="border-b-1 opacity-10 m-4"></div>
                            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
                                        <label htmlFor="name">Name:</label>
                                        <input id='name' type="text" className="border rounded p-1 focus:border-primary focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primary w-full" placeholder="Name" value={name} onChange={ e => setName(e.target.value)} required></input>
                                    </div>  
                                    <div className="flex flex-col">
                                        <label htmlFor="lastName">Last Name:</label>
                                        <input id='lastName' type="text" className="border rounded p-1 focus:border-primary focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primary w-full" placeholder="Last Name" value={lastName} onChange={ e => setLastName(e.target.value)} required></input>
                                    </div>
                                </div>
                                
                                <label htmlFor="email" className="mt-2">Email:</label>
                                <input id='email' type="email" className="border rounded p-1 focus:border-primary focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primary" placeholder="Email" value={email} onChange={ e => setEmail(e.target.value)} required></input>
                                <label htmlFor="password" className="mt-2">Password:</label>
                                <input id='password' type="password" className="border rounded p-1 focus:border-primary focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primary" placeholder="Password" value={password} onChange={ e => setPassword(e.target.value)} required></input>
                                
                                <button type="submit" value='Submit' className="bg-secondary text-white rounded-2xl p-2 font-semibold mt-6 cursor-pointer">Sign Up</button>
                            </form>
                        </div>
                    </div>
                    <div className='w-[45%] min-h-screen flex flex-col justify-center items-center'>
                        <h1 className="text-6xl text-white font-bold text-center m-4">Already have an account?</h1>
                        <Link to='/auth/login'>
                            <button className="bg-black text-white w-md p-2 rounded-2xl text-xl m-4 font-semibold cursor-pointer">Log in here!</button>
                        </Link>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default RegisterPage;