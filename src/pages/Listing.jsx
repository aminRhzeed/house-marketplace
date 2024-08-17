import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import {getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config.js'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/swiper-bundle.css'
import Spinner from '../components/Spinner.jsx'
import { ReactComponent as ShareIcon } from '../assets/svg/shareIcon.svg'

function Listing() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkedCopied, setShareLinkedCopied] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'listing', params.listingId)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()) {
                setListing(docSnap.data())
                setLoading(false)
            }
        }
        fetchListing()
    }, [navigate, params.listingId])

    if(loading) {
        return <Spinner />
    }

    return (
        <main>
            <Swiper modules={[Navigation, Pagination, Scrollbar]} slidesPerView={1} pagination={{clickable: true}} navigation>
                {listing.imgUrls.map((url, index) => (
                    <SwiperSlide key={index}>
                        <div className='swiperSlideDiv' style={{aspectRatio: '16/10', overflow: 'hidden'}}>
                            <img src={listing.imgUrls[index]} alt="" style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center'}} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className='shareIconDiv' onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                setShareLinkedCopied(true)
                setTimeout(() => {setShareLinkedCopied(false)}, 2000)
            }}>
                <ShareIcon />
            </div>
            {shareLinkedCopied && <p className='linkCopied'>Link Copied!</p>}

            <div className='listingDetails'>
                <p className='listingName'>
                    {listing.name} - $
                    {listing.offer
                        ? listing.discountedPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g,',')
                        : listing.regularPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g,',')}
                </p>
                <p className='listingLocation'>{listing.location}</p>
                <p className='listingType'>
                    For {listing.type === 'rent' ? 'Rent' : 'Sale'}
                </p>
                {listing.offer && (
                    <p className='discountPrice'>
                        ${listing.regularPrice - listing.discountedPrice} Discount
                    </p>
                )}
                <ul className='listingDetailsList'>
                    <li>{listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedrooms' }</li>
                    <li>{listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathrooms' }</li>
                    <li>{listing.parking && 'Parking Spot'}</li>
                    <li>{listing.furnished && 'Furnished'}</li>
                </ul>
                <p className='listingLocationTitle'>Location</p>

                <div className='leafletContainer'>
                    <MapContainer style={{height: '100%', width: '100%'}} center={[listing.latitude, listing.longitude]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        />
                        <Marker position={[listing.latitude, listing.longitude]}>
                            <Popup>{listing.location}</Popup>
                        </Marker>
                    </MapContainer>
                </div>

                {auth.currentUser?.uid!== listing.userRef && (
                    <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className='primaryButton'>Contact Landlord</Link>
                )}
            </div>
        </main>
    )
}

export default Listing