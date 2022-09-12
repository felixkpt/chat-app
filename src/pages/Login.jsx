import { Error, Success } from '../components/notifications/Notifications'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)
    const loc = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value

        try {
            setSuccess(false)
            setErr(false)
            await signInWithEmailAndPassword(auth, email, password)
            loc('/')

        } catch (e) {
            setErr(true)
        }

    }
    return (
        <div className='formContainer'>
            <div className="formWrapper">
                <span className='logo'>Married Chat</span>
                <span className='title'>Login</span>
                {success && <Success message="Successfully logged in!" />}
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='Email' />
                    <input type="password" placeholder='Password' />
                    <button>Sign in</button>
                    {err && <Error />}
                </form>
                <p>Don't have an account? <Link to='/register'>Register</Link> </p>
            </div>
        </div>
    )
}

export default Login