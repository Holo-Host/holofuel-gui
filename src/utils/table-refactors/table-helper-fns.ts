// export const validate = () => {
//   let errors = {};
//   let valid = true;
//   if (!(this as any).state.fromAccount) errors.fromAccount="From Account Field is Required";
//   if (!(this as any).state.toAccount) errors.toAccount="To Account Field is Required";
//   if (!(this as any).state.startDate) errors.startDate="From Account Field is Required";
//   if (!(this as any).state.ammount) errors.ammount="Ammount Field is Required";
//   if (!(this as any).state.transferType){
//     errors.transferType="Transfer Type Field is Required";
//   }
//   else if (this.state.transferType==="Automatic Transfer"){
//     if (!this.state.endDate) errors.endDate="End Date Field is Required";
//     if (!this.state.frequency) errors.frequency="Frequency Field is Required";
//   }
//
//   if (Object.getOwnPropertyNames(errors).length>0) valid = false;
//   this.setState({errors})
//   console.log(errors);
//   return valid;
// }

export const getToday = () => {
  let today : any = new Date();
  let dd : any = today.getDate();
  let mm : any = today.getMonth()+1; //January is 0!
  let yyyy : any = today.getFullYear();

  if (dd<10) dd='0'+dd;
  if (mm<10) mm='0'+mm;

  today = yyyy+'-'+mm+'-'+dd;

  return today;
}
