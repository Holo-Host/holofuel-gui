import * as React from 'react';
// local sub-component imports :
import Geolocator from '../../page-sub-components/geolocator/Geolocator';
// custom stylesheet
import '../../component-styles/scaffold-styles.css';

const physicalLocation = { lng: -103.4054536, lat: 20.6737777 };

const Contact = (props: any) => {
  return(
    <div className='profile'>
      <h3>Contact Page</h3>
      <Geolocator initialCenter={physicalLocation} />
      <ul className='profile-content'>
        <li>
          <h4>Phone Number</h4>
          <p>777-777-7777</p>
        </li>
        <li>
          <h4>Email</h4>
          <p>holo@host.com</p>
        </li>
        <li>
          <h4>Holo Host Website</h4>
          <a href='https://holo.host/'><p>holo.host</p></a>
        </li>
      </ul>
    </div>
  );
};

export default Contact;
