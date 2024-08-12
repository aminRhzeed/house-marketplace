import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as OfferIcon } from '../assets/svg/offerIcon.svg';
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg';
import { ReactComponent as ProfileIcon } from '../assets/svg/profileIcon.svg';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => {
    if(route === location.pathname) {
      return true
    }
  }

  return (
    <footer className='navbar'>
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem" onClick={() => navigate('/') }>
            <ExploreIcon fill={pathMatchRoute('/') ? '#303136' : '#5b5e66'} width='36px' height='36px' />
            <p className={pathMatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName' }>Explore</p>
          </li>
          <li className="navbarListItem" onClick={() => navigate('/offers')}>
            <OfferIcon fill={pathMatchRoute('/offers') ? '#303136' : '#5b5e66'} width='36px' height='36px' />
            <p className={pathMatchRoute('/offers') ? 'navbarListItemNameActive' : 'navbarListItemName' }>Offers</p>
          </li>
          <li className="navbarListItem" onClick={() => navigate('/profile')}>
            <ProfileIcon fill={pathMatchRoute('/profile') ? '#303136' : '#5b5e66'} width='36px' height='36px' />
            <p className={pathMatchRoute('/profile') ? 'navbarListItemNameActive' : 'navbarListItemName' }>Profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
