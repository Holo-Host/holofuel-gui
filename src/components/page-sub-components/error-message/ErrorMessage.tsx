import * as React from 'react';
import QueueAnim from 'rc-queue-anim';

const NoMatch = () => (
  <div className="error-container text-center" style={{margin:"20vh"}}>
    <div className="error" style={{textAlign:'center', margin:'0 auto'}}>
      <h1 style={{justifyContent:'center', color:"#95b9ed"}}>404</h1>
      <h2 style={{justifyContent:'center', color:"#95b9ed"}}>Sorry, no transactions yet exist.</h2>
    </div>
  </div>
);

const ErrorMessage = () => (
  <div className="page-error">
    <QueueAnim type="bottom">
      <div key="1">
        <NoMatch />
      </div>
    </QueueAnim>
  </div>
);

export default ErrorMessage;
