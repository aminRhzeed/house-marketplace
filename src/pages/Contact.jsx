import { useState, useEffect } from 'react'
import { useParams,useSearchParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config.js'
import { toast } from 'react-toastify'

function Contact() {
    const [message, setMessage] = useState('')
    const [landlord, setLandlord] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const params = useParams()

    useEffect(() => {
        const getLandlord = async () => {
            const docRef = doc(db, 'users', params.landlordId)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()) {
                setLandlord(docSnap.data())
            } else {
                toast.error('Could not Get landlord Data')
            }
        }
        getLandlord()
    }, [params.landlordId])

    const onChange = (e) => setMessage(e.target.value)

    return (
        <div className='pageContainer'>
            <header>
                <p className='pageHeader'>Contact Landlord</p>
            </header>
            {landlord !== null && (
                <main>
                    <div className='contactLandlord'>
                        <p className='landlordName'>Contact {landlord?.name}</p>
                    </div>
                    <form className='messageForm'>
                        <div className='messageDiv'>
                            <label htmlFor='message' className='messageLabel'>
                                Message
                            </label>
                            <textarea name='message' id='message' className='textarea' rows='10' onChange={onChange}></textarea>
                        </div>
                        <a href={`mailto:${landlord.email}?subject=${searchParams.get('listingName')}&body=${message}`}>
                            <button type='button' className='primaryButton'>Send Message</button>
                        </a>
                    </form>
                </main>
            )}
        </div>
    )
}
export default Contact