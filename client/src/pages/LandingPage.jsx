import { Link } from 'react-router-dom';
import NavBarLanding from '../components/NavBarLanding';
import appPreview from '../assets/appPreview.webp';
import logoInstagram from '../assets/logoInstagram.svg';
import logoFacebook from '../assets/logoFacebook.svg';
import logoTiktok from '../assets/logoTiktok.svg';

function LandingPage() {
    return (
    <div className='relative min-h-screen'>
        {/* Background */}
        <div className='absolute inset-0 flex min-h-screen'>
            <div className='bg-primary w-1/2 h-full'></div>
            <div className='bg-gray-100 w-1/2 h-full'></div>
        </div>
        {/* Content */}
        <div className='relative'>
            {/* Nav Bar */}
            < NavBarLanding />

            {/* Heading */}
            <div className='flex'>
                <div className='w-1/2 min-h-screen flex flex-row justify-center items-center'>
                    <div>
                        <div className='bg-white rounded-2xl p-10'>
                            <h1 className='text-6xl font-bold'>Priori-List</h1>
                            <h2 className='text-xl font-medium text-primary mt-2'>Being organized has never been so simple</h2>
                            <Link to='/auth/register'> 
                                <button className='bg-secondary py-2 rounded-2xl w-full text-white text-2xl font-semibold mt-8 hover:cursor-pointer'>Start using priori-list!</button>
                            </Link>
                        </div>
                        {/* Social Medias */}
                        <div className='flex m-6 justify-center'>
                            <Link><img src={logoInstagram} alt="Red social instagram" className='w-12 h-12 mx-6'/></Link>
                            <Link><img src={logoFacebook} alt="Red social facebook" className='w-12 h-12 mx-6'/></Link>
                            <Link><img src={logoTiktok} alt="Red social tik tok" className='w-12 h-12 mx-6'/></Link>
                            
                            
                            
                        </div>
                    </div>
                    
                </div>
                <div className='w-1/2 min-h-screen flex flex-row justify-center items-center'>
                    <img src={appPreview} alt='Image of the preview app' className='w-md rounded-2xl max-w-3/4'></img>
                </div>
            </div>
            
            
        </div>
        
    </div>
    )
}

export default LandingPage;