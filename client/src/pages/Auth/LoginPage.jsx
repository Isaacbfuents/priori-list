import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'

function LoginPage() {

    const navigate = useNavigate(); // Hook para redireccionar
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if( email === '' || password === '' ) {
            return console.log('Favor de llenar todos los campos');
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, { email, password }, { withCredentials: true });
            
            setEmail('');
            setPassword('');

            console.log(res.data)
            if( res.data.auth ) { // Si el usuario esta autenticado
                localStorage.setItem('accessToken', res.data.accessToken); // Guardar el access token en el local storage

                // El refresh token se envia del backend

                navigate('/home');
            } else {
                navigate('/auth/verify-email', {state: { email }});
            }
            
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="relative min-h-screen">
            {/* Background */}
            <div className='absolute inset-0 flex min-h-screen'>
                <div className='bg-primary w-[45%] h-full'></div>
                <div className='bg-gray-100 w-[55%] h-full'></div>
            </div>

            {/* Content */}
            <div className="relative">
                <div className="flex">
                    <div className='w-[45%] min-h-screen flex flex-col justify-center items-center'>
                        <h1 className="text-6xl text-white font-bold text-center m-4">Don't have an account?</h1>
                        <Link to='/auth/register'>
                            <button className="bg-black text-white w-md p-2 rounded-2xl text-xl m-4 font-semibold cursor-pointer">Sign up here!</button>
                        </Link>
                    </div>
                    <div className="w-[55%] min-h-screen flex justify-center items-center">
                        <div className="bg-white shadow-xl p-10 m-10">
                            <h2 className="text-4xl font-semibold text-secondary text-center">Welcome back!</h2>
                            <p className="text-lg font-medium text-black mt-2 text-center">Access your account and keep moving forward. We’re here to help every step of the way.</p>
                            <div className="border-b-1 opacity-10 m-4"></div>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                                
                                <label htmlFor="email" className="mt-2">Email:</label>
                                <input id='email' type="email" className="border rounded p-1 focus:border-primary focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primary" placeholder="Email" value={email} onChange={ e => setEmail(e.target.value) } required></input>
                                <label htmlFor="password" className="mt-2">Password:</label>
                                <input id='password' type="password" className="border rounded p-1 focus:border-primary focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primary" placeholder="Password" value={password} onChange={ e => setPassword(e.target.value) } required></input>
                                <label className="text-right">Forgot your password? <Link className="text-blue-800 font-semibold active:text-blue-600 visited:text-purple-700">Reset it here.</Link></label>

                                <button type="submit" value='Submit' className="bg-secondary text-white rounded-2xl p-2 font-semibold mt-6 cursor-pointer">Log In</button>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default LoginPage;