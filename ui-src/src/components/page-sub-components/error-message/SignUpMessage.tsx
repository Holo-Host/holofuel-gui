import * as React from 'react';
import QueueAnim from 'rc-queue-anim';

const NotRegistered = () => (
  <div className="error-container text-center" style={{margin:"20vh"}}>
    <div className="error" style={{justifyContent:'center', color:"#0e094b", padding: 20, width: '40%', margin: '0 auto', background:'#fcfeff', border: '2px solid #bec4dd'}}>
      <h2 style={{justifyContent:'center', color:"#0e094b"}}>Welcome to your Holofuel Homepage.</h2>
      <h4 style={{justifyContent:'center', color:"#0e094b"}}>To get started, set up a <a href='/profile'>profile</a>.</h4>
    </div>
  </div>
);

const SignUpMessage = () => (
  <div className="page-error">
    <QueueAnim type="bottom">
      <div key="1">
        <NotRegistered />
      </div>
    </QueueAnim>
  </div>
);

export default SignUpMessage;
