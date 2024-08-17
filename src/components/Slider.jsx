import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config.js'
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/swiper-bundle.css'
import Spinner from './Spinner.jsx'

function Slider() {
    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchListings = async () => {
            const listingsRef = collection(db, 'listing')
            const q = query(listingsRef, orderBy('timestamp', 'desc', limit(5)))
            const querySnap = await getDocs(q)

            let listings = []

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            console.log(listings)
            setListings(listings)
            setLoading(false)
        }
        fetchListings()
    }, [])

    if(loading) {
        return <Spinner />
    }

    if(listings.length === 0){
        return <></>
    }

    return listings && (
        <>
            <p className='exploreHeading'>Recommended</p>
            <Swiper modules={[Navigation, Pagination, Scrollbar]} slidesPerView={1} pagination={{clickable: true}}>
                {listings.map(({data, id}) => (
                    <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
                        <div className='swiperSlideDiv' style={{aspectRatio: '16/10', overflow: 'hidden'}}>
                            <img src={data.imgUrls[0]} alt="" style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center'}}/>
                        </div>
                        <div>
                            <p className='swiperSlideText'>{data.name}</p>
                            <p className='swiperSlidePrice'>
                                ${data.discountedPrice ?? data.regularPrice}
                                {data.type === 'rent' && ' / month'}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default Slider