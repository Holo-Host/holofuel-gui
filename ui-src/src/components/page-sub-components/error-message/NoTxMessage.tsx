import * as React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const NotRegistered = () => (
  <div className="error-container text-center" style={{margin:"20vh"}}>
    <div className="error" style={{justifyContent:'center', color:"#0e094b", padding: 20, width: '250px', margin: '0 auto', background:'#fcfeff', border: '2px solid #bec4dd'}}>
      <h2 style={{justifyContent:'center', color:"#0e094b"}}>You currently have no transaction history.</h2>
      <div style={{display:'flex', flexDirection:'row'}}>
        <Link to='/holofuelrequest' style={{textDecoration:'none', margin:'1px'}}>
          <Button variant="contained" size="large" color="primary" style={{justifyContent:'center', color:"#eee"}}>
              Request HoloFuel
          </Button>
        </Link>
        <Link to='/holofuelpromise' style={{textDecoration:'none', margin:'1px'}}>
          <Button variant="contained" size="large" color="primary" style={{justifyContent:'center', color:"#eee"}}>
              Send HoloFuel
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

const NoTxMsessage = () => (
  <div className="page-error">
    <QueueAnim type="bottom">
      <div key="1">
        <NotRegistered />
      </div>
    </QueueAnim>
  </div>
);

export default NoTxMsessage;
