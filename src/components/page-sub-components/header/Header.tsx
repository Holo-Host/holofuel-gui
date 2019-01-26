import * as React from 'react';
// custom stylesheet :
import '../../component-styles/scaffold-styles.css';

const Header = (props: any) => {
  return(
    <div>
      <div className='btnMenu' >
        <label htmlFor='chkMenu'>
          <i className='fa fa-bars'/>
        </label>
      </div>
      <input type='checkbox' id='chkMenu' />
      <nav className='menu'>
        <div className='title'>National Bank</div>
       <ul>
          <li><label htmlFor='chkMenu' onClick={() => props.setRoute('profile')}>Transfer Activity</label></li>
          <li><label htmlFor='chkMenu' onClick={() => props.setRoute('form')}>Transactions</label></li>
          <li><label htmlFor='chkMenu' onClick={() => props.setRoute('contact')}>Contact</label></li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
