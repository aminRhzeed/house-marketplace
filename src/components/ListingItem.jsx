import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as BedIcon } from '../assets/svg/bedIcon.svg'
import { ReactComponent as BathTubIcon } from '../assets/svg/bathtubIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'

function ListingItem({ listing, id, onDelete, onEdit }) {
    return (
        <li className='categoryListings'>
            <Link to={`/category/${listing.type}/${id}`} className='categoryListingLink'>
                <img src={listing.imgUrls} alt={listing.name} className='categoryListingImg'/>
                <div className='categoryListingDetails'>
                    <p className='categoryListingLocation'>{listing.location}</p>
                    <p className='categoryListingName'>{listing.name}</p>
                    <p className='categoryListingPrice'>
                        ${listing.offer ?
                            listing.discountedPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g,',')
                            : listing.regularPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g,',')
                        }
                        {listing.type === 'rent' && ' / Month'}
                    </p>
                    <div className='categoryListingInfoDiv'>
                        <BedIcon/>
                        <p className='categoryListingInfoText'>
                            {listing.bedrooms > 1 ? `${listing.bedrooms}Bedrooms` : '1 Bedrooms'}
                        </p>
                        <BathTubIcon/>
                        <p className='categoryListingInfoText'>
                            {listing.bathrooms > 1 ? `${listing.bathrooms}Bathrooms` : '1 Bathrooms'}
                        </p>
                    </div>
                </div>
            </Link>
            <div>
                {onDelete && (
                    <DeleteIcon className='removeIcon' stroke='rgb(231, 76, 60)' onClick={() => onDelete(listing.id, listing.name )} />
                )}
                {onEdit && <EditIcon className='editIcon' onClick={() => onEdit(id)} />}
            </div>
        </li>
    )
}

export default ListingItem