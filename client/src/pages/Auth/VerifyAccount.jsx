import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios';

function VerifyAccount() {

    const [searchParams] = useSearchParams();
    const hasVerifiedRef = useRef(false); // Evitar multiples ejecuciones
    const navigate = useNavigate();
    const token = searchParams.get("token");
    

    useEffect(() => {
        const verifyAccount = async () => {
            if(!token) {
                console.log('No existe el token');
                return;
            }

            if(hasVerifiedRef.current) return;
            hasVerifiedRef.current = true;

            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify/${token}`);
                console.log(res)
            } catch (error) {
                console.log(error)  
            } 
        }
    
        verifyAccount();
        
    }, [navigate, token])

    return (
        <div className="flex items-center flex-col m-4">
            <h1 className="text-center text-2xl text-primary font-bold m-4" style={{ textShadow: '1px 1px 1px rgba(0, 0, 0, 0.25)' }}>Your account has been authenticated correctly!</h1>
            <Link to="/auth/login" className="m-4 bg-secondary w-50 text-white rounded-2xl text-lg font-semibold text-center">Sign In</Link>
        </div>
    )
}

export default VerifyAccount;