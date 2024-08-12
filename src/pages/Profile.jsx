import { useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import { db } from '../firebase.config'
import { updateDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRight } from '../assets/svg/keyboardArrowRightIcon.svg'
import { ReactComponent as HomeIcon } from '../assets/svg/homeIcon.svg'

function Profile() {
    const auth = getAuth()
    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })

    const { name, email } = formData

    const navigate = useNavigate()
    const onLogout = () => {
        auth.signOut()
        navigate('/')
    }

    const onSubmit = async () => {
        try {
            if (auth.currentUser.displayName !== name) {
                // UPDATE
                await updateProfile(auth.currentUser, {
                    displayName: name,
                })
                // Update FIRESTORE
                const userRef = doc(db, 'users', auth.currentUser.uid)
                await updateDoc(userRef, {
                    name
                })
            }
        } catch (error) {
            toast.error('Could not Update Profile Details')
        }
    }

    const onChange = (e) => {
        setFormData((pervState) => ({
            ...pervState,
            [e.target.id]: e.target.value,
        }))
    }

    return <div className='profile'>
           <header className='profileHeader'>
               <p className='pageHeader'>My Profile</p>
               <button type='button' className='logOut' onClick={onLogout}>Logout</button>
           </header>
            <main>
                <div className="profileDetailsHeader">
                    <p className="profileDetailsText">Personal Details</p>
                    <p className="changePersonalDetails" onClick={() => {
                        changeDetails && onSubmit()
                        setChangeDetails((pervState) => !pervState )
                    }}>
                        {changeDetails ? 'Done' : 'Change'}
                    </p>
                </div>
                <div className="profileCard">
                    <form>
                        <input type='text' id='name' className={!changeDetails ? 'profileName' : 'profileNameActive'} disabled={!changeDetails} value={name} onChange={onChange}/>
                        <input type='text' id='email' className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} disabled={!changeDetails} value={email} onChange={onChange}/>
                    </form>
                </div>
                <Link to='/create-listing' className='createListing'>
                    <HomeIcon />
                    <p>Sell or Rent Your Home</p>
                    <ArrowRight />
                </Link>
            </main>
        </div>
}

export default Profile
