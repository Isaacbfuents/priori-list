import { useLocation } from 'react-router-dom';
import axios from 'axios'

function VerifyEmail() {
    const location = useLocation();
    const email = location.state?.email;

    const handleClick = async () => {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/resend-verificationToken`, { email });
        console.log('Se pudo conectar correctamente a la api', email);
    }


    return (
        <div className="flex justify-center">
            <div className="mt-10">
                <h1 className="m-2 text-primary text-2xl text-center font-bold">An email for authentication has been sent.</h1>
                <p className="m-2 text-secondary font-medium">Please check your inbox and follow the instructions to verify your account.</p>
                <p className="m-2"><span className="font-medium">Didn't receive the email?</span> Check your spam folder or <span className="font-semibold text-secondary" onClick={handleClick}>click here</span> to resend it.</p>
            </div>
            
        </div>
    )
}

export default VerifyEmail;