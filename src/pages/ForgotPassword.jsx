import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const onChange = (e) => {
        setEmail(e.target.value)
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const auth = getAuth()
            await sendPasswordResetEmail(auth, email)
            toast.success('Email Was Sent')
        } catch (error) {
            toast.error('Could Not Send Reset Email')
        }
    }

    return (
        <div className='pageContainer'>
            <header>
                <p className='pageHeader'>Forgot Password</p>
            </header>
            <main>
                <form onSubmit={onSubmit}>
                    <input type='email' className='emailInput' placeholder='Email' id='email' value={email} onChange={onChange} />
                    <div className='signInBar' style={{marginTop:0}}>
                        <button className='signInButton'>
                            Send Reset Link
                            <ArrowRightIcon fill='#fff' width='34px' height='34px' />
                        </button>
                    </div>
                    <Link className='forgotPasswordLink' to='/sign-in'>Sign In</Link>
                </form>
            </main>
        </div>
    )
}

export default ForgotPassword
