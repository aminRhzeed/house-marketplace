import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config.js'
import { toast } from 'react-toastify'
import { ReactComponent as GoogleIcon } from '../assets/svg/googleIcon.svg'

function OAuth() {
    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            // Check For User
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)
            // if User, Doesn't Exist, then Create user
            if (!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }
            navigate('/')
        } catch (error) {
            toast.error('Could not Authorize With Google')
        }
    }

    return (
        <div className='socialLogin'>
            <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with</p>
            <button className='socialIconDiv' onClick={onGoogleClick}>
                <GoogleIcon width='34px' height='34px' />
            </button>
        </div>
    )
}
export default OAuth