import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

function NavBarLanding() {
    return (
        <div className='bg-white w-[95%] rounded-4xl h-12 px-5 fixed top-5 left-1/2 -translate-x-1/2 shadow-2xl flex justify-between z-1'>
            <img src={logo} alt='Logo' className='h-10 my-auto'></img>
            <div className='flex justify-around'>
                <Link to='/auth/login' className='m-auto mx-5'>
                    <button className='bg-black text-white font-semibold text-center h-9 rounded-xl py-1 px-4 w-24 hover:cursor-pointer'>Log In</button>
                </Link>
                <Link to='/auth/register' className='m-auto mx-5'>
                    <button className='bg-secondary text-white font-semibold text-center h-9 rounded-xl py-1 px-4 w-24 hover:cursor-pointer'>Register</button>
                </Link>    
            </div>
        </div>
    )
}

export default NavBarLanding;