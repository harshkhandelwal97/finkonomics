import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {

    const navigate = useNavigate();
    useEffect(() => {

        const timer = setTimeout(() => {
            navigate("/");
        }, 3000);

        return () => clearTimeout(timer);

    }, [navigate])

    return (
        <div>
            Payment Successfull
        </div>
    )
}