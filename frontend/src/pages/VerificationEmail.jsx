import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const VerificationEmail = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const { verifyEmail,error,isLoading } = useAuthStore();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setVerificationCode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would typically send the verificationCode to your backend for verification
        try {
            // const response = await fetch('/api/verify-email', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ code: verificationCode }),
            // });

            // if (response.ok) {
            //     // Successful verification, redirect to the desired page
            //     navigate('/dashboard'); // Replace '/dashboard' with your desired route
            // } else {
            //     // Handle verification error (e.g., display an error message)
            //     console.error('Verification failed');
            // }
            await verifyEmail(verificationCode);
            navigate('/');
            toast.success("Email verified successfully");
        } catch (error) {
            console.error('Verification error:', error);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-24">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Email Verification</h2>
                <p className="text-gray-700 text-center mb-4">
                    Enter the verification code sent to your email:
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            id="verificationCode"
                            name="verificationCode"
                            value={verificationCode}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Verify
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default VerificationEmail;