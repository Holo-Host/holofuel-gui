import * as React from 'react';
import QueueAnim from 'rc-queue-anim';

const NoMatch = () => (
  <div className="error-container text-center" style={{margin:"20vh"}}>
    <div className="error" style={{justifyContent:'center', color:"#0e094b", padding: 20, width: '40%', margin: '0 auto', background:'#fcfeff', border: '2px solid #bec4dd', minWidth:'120px'}}>
      <h2 style={{justifyContent:'center', color:"#0e094b"}}>Oops, it appears you're not connected to Holochain.</h2>
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

// /* <div className="error" style={{justifyContent:'center', color:"#0e094b", padding: 20, width: '40%', margin: '0 auto', background:'#fcfeff', border: '2px solid #bec4dd', minWidth:'120px'}}>
  // <h2 style={{justifyContent:'center', color:"#0e094b"}}>Sorry, no transactions yet exist.</h2>
  // <h4 style={{justifyContent:'center', color:"#0e094b"}}>Please select the HoloFuel Transaction option in the navigation bar to make your first transaction.</h4>
// </div> */
