import * as React from 'react';
// mui custom styling imports :
// import Typography from '@material-ui/core/Typography'
// local imports :

// TODO: Make a Summary Component >> modularize current summary within tx history...
// import Summary from '../summary/Summary';
import '../../styles/page-styles/scaffold-styles.css';

const ConfirmMessage = (props: any) => {
  let today: any = new Date();
  let dd: any = today.getDate();
  let mm: any = today.getMonth() + 1; //  January is 0!
  const yyyy: any = today.getFullYear();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  today = mm + '/' + dd + '/' + yyyy;

  return (
		<div className='confirm'>
			<div className='notice success'>
				<i className='fa fa-smile-o'/>
				<p>Your transfer has been successfully completed on {today} with confirmation number {props.txAmount}</p>
			</div>

      {/*  <div className='button-holder'>
       <input type='button' className='button CTAButton' value='Do Another Transaction' onClick={() => props.restartTransferForm('form')}/>
      </div> */}
		</div>
  );

};
export default ConfirmMessage;

// modularize below and includ the summary component above
// IE: {/* <Summary form={props.form}/> */
// (
//   <div>
//     <div className={classes.jumbotron}>
//       <h3 className={classes.h3}>Current Summary</h3>
//       <Typography className={classes.mainHeader} variant="display1" gutterBottom={gutterBottom} component="h1" >
//         {this.props.ledger_state.balance} + 200 HF
//       </Typography>
//       <hr style={{color:"#0e094b"}} />
//       <h3 className={classes.h3}>Credit limit : 80 HF {this.props.ledger_state.credit} </h3>
//     </div>
//   )
