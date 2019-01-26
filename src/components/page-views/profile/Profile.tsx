import * as React from 'react';
// local sub-component imports :
import SimpleTable from '../../page-sub-components/simple-table/SimpleTable';
// import pendingData from '../../../utils/seed-data/pending-data';
// import processedData from '../../../utils/seed-data/processed-data';
// custom stylesheet
import '../../component-styles/scaffold-styles.css';

const Profile = (props:any) => {
  return(
    <div className='transfer-activity profile'>
      <h3>Transfer Activity</h3>
      <h4>Pending Transfers</h4>
      <SimpleTable data={processedData}/>

      <h4>Processed Transfers</h4>
      <SimpleTable data={pendingData}/>
    </div>
  );
}

export default Profile;


const pendingData = [
  {Type:"Automatic", Amount:"$2.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/23/2016"},
  {Type:"Automatic", Amount:"$2.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/23/2016"},
  {Type:"Automatic", Amount:"$2.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/23/2016"},
  {Type:"Automatic", Amount:"$2.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/23/2016"},
  {Type:"Automatic", Amount:"$2.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/23/2016"},
  {Type:"Automatic", Amount:"$2.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/23/2016"}
];

const processedData = [
  {Type:"Automatic", Amount:"$5.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/24/2016"},
  {Type:"Automatic", Amount:"$5.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/24/2016"},
  {Type:"Automatic", Amount:"$5.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/24/2016"},
  {Type:"Automatic", Amount:"$5.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/24/2016"},
  {Type:"Automatic", Amount:"$5.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/24/2016"},
  {Type:"Automatic", Amount:"$5.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/24/2016"},
  {Type:"Automatic", Amount:"$5.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/24/2016"},
  {Type:"Automatic", Amount:"$5.99", From:"Account 1", To:"Account 2", "Transaction Date":"05/24/2016"},
];
