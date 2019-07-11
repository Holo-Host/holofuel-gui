import * as React from 'react';
import QueueAnim from 'rc-queue-anim';

const NoMatch = (errorMessage:any) => (
  <div className="error-container text-center" style={{margin:"20vh"}}>
    <div className="error" style={{justifyContent:'center', color:"#0e094b", padding: 20, width: '40%', margin: '0 auto', background:'#fcfeff', border: '2px solid #bec4dd', minWidth:'120px'}}>
      <h2 style={{justifyContent:'center', color:"#0e094b"}}>Hmmm.. Let's double check that entry.</h2>
      <h4 style={{justifyContent:'center', color:"#0e094b"}}>{errorMessage}</h4>
    </div>
  </div>
);

const DialogError = ( errorMessage:any ) => (
  <div className="page-error">
    <QueueAnim type="bottom">
      <div key="1">
        <NoMatch errorMessage={errorMessage} />
      </div>
    </QueueAnim>
  </div>
);

export default DialogError;
