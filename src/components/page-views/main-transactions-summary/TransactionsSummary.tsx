import * as React from 'react';
import * as _ from 'lodash';
// local sub-component imports :
import Header from '../../page-sub-components/header/Header';
import HiddenFields from '../../page-sub-components/hidden-fields/HiddenFields';
import Memo from '../../page-sub-components/memo/Memo';
import Verify from '../../page-sub-components/verify/Verify';
import Select from '../../page-sub-components/select/Select';
import Confirm from '../../page-sub-components/confirm/Confirm';
// import Summary from '../../page-sub-components/summary/Summary';
import Footer from '../../page-sub-components/footer/Footer';
// local page-views imports
import Profile from '../profile/Profile';
import Contact from '../contact/Contact';
// utils import :
import { getToday } from '../../../utils/table-refactors/table-helper-fns';
// custom stylesheet :
import '../../component-styles/scaffold-styles.css';
/////////////////////////////////////////////////////////////////////////////////////////

export interface OwnProps {
  // These are props the component creates and maintains within itself &&/ from its parent component
  // e.g. what you write in <ExampleComponent ...>
}

export interface StateProps {
// Props that are set by mapStateToProps
}
export interface DispatchProps {
// Props that are set by mapDispatchToProps
}
export type Props = OwnProps & StateProps;

export interface State {
  // The components optional internal state
  route: string,
  fromAccount: any | null,
  toAccount: any | null,
  transferType: string,
  amount: number,
  memo: {
    text: string,
    len: number
  },
  fromAccounts: any | null,
  toAccounts: any | null,
  startDate: any,
  endDate: any | null,
  frequency: string | null,
  modal: boolean,
  form: Array<{}>,
  errors: {
    startDate: any | null,
    transferType: any | null,
    toAccount: any | null,
    fromAccount: any | null,
    amount: any | undefined
  }
}

class TransactionSummary extends React.Component<Props, State> {
  constructor (props: any) {
    super(props);
    this.state = {
      route: 'form',
      fromAccount: null,
      toAccount: null,
      transferType: '',
      amount: 0,
      memo: {
        text: '',
        len: 0
      },
      fromAccounts: [
          { 'id': '204','amount': 2012.0,'name': 'Art\'s Account' },
          { 'id': '154','amount': 1212.0,'name': 'Perry\'s Account' },
          { 'id': '164','amount': 1412.0,'name': 'Juilo\'s Account' },
          { 'id': '174','amount': 1612.0,'name': 'Joel\'s Account' },
          { 'id': '184','amount': 1812.0,'name': 'Michael\'s Account' },
          { 'id': '194','amount': 1912.0,'name': 'PJ\'s Account' }
      ],
      toAccounts: [
          { 'id': '204','amount': 2012.0,'name': 'Account 5' },
          { 'id': '154','amount': 1212.0,'name': 'Account 6' },
          { 'id': '164','amount': 1412.0,'name': 'Account 1' },
          { 'id': '174','amount': 1612.0,'name': 'Account 2' },
          { 'id': '184','amount': 1812.0,'name': 'Account 3' },
          { 'id': '194','amount': 1912.0,'name': 'Account 4' }
      ],
      startDate: null,
      endDate: null,
      frequency: null,
      modal: false,
      form: [{}],
      errors: {
        startDate: null,
        transferType: null,
        toAccount: null,
        fromAccount: null,
        amount: 0
      }
    };
    this.validate = this.validate.bind(this);
    this.changeStartDate = this.changeStartDate.bind(this);
    this.confirmSubmit = this.confirmSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.changeFrom = this.changeFrom.bind(this);
    this.changeTo = this.changeTo.bind(this);
    this.changeTransfer = this.changeTransfer.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.changeMemo = this.changeMemo.bind(this);
    this.restart = this.restart.bind(this);
  }

  componentDidMount () {
    // Set Date
    const date: any = getToday();
    this.setState({ startDate: date });
  }

	// Handle Form Submitting
  handleSubmit = (event: any) => {
    event.preventDefault();
    if (!this.validate()) return;
    this.setState({
      modal: true,
      form: [
				{ 'From Account': this.state.fromAccount },
				{ 'To Account': this.state.toAccount },
				{ 'Transfer Type': this.state.transferType },
				{ 'Date' : this.state.startDate },
				{ 'End Date' : this.state.endDate },
				{ 'Frequency': this.state.frequency },
				{ 'Amount': '$' + this.state.amount },
				{ 'Memo': this.state.memo.text }
      ]
    });
  }

	// Helper Render Function
  showHiddenFields = (radio: any) => {
    if (radio === 'One Time Transfer') {
      return (
				<fieldset className={(this.state.errors.startDate) ? 'error' : ''}>
					<label className='main-label'>Transfer Date</label>
					<input type='date' value={this.state.startDate} onChange={e => this.changeStartDate(e)}/>
					<i className='fa fa-calendar fa-fw'/>
				</fieldset>
			);
		}
    else if (radio === 'Automatic Transfer') {
			return (
				<HiddenFields startDate={this.state.startDate} endDate={this.state.endDate} frequency={this.state.frequency}
					changeStartDate={this.changeStartDate.bind(this)}
					changeEndDate={this.changeEndDate.bind(this)}
					changeFrequency={this.changeFrequency.bind(this)} errors={this.state.errors}
        />
			);
		}
	}

	renderModal = () => {
		if (!this.state.modal) { return };

    console.log('Modlal State ON: Showing Modal');
		return (
			<div className='modalWindow'>
				<div className='modal-content'>
					<a href='#' className='close-button' onClick={() => {this.showModal(false)}} />
					<Verify form={this.state.form} showModal={this.showModal} confirmSubmit={this.confirmSubmit}/>
				</div>
			</div>
		);
	}

	router = (route: any) => {
		if (route==='form') {
			return (
        <div>
          <h3>Transfer Funds</h3>
          <form onSubmit={this.handleSubmit}>

            <Select onChange={this.changeFrom} account={this.state.fromAccount} title='From account'
              css_class={(this.state.errors.fromAccount)?'half-width error' : 'half-width'} serverResponse={this.state.fromAccounts}/>

            <Select onChange={this.changeTo} account={this.state.toAccount} title='To account'
              css_class={(this.state.errors.toAccount)?'half-width right error' : 'half-width right'} serverResponse={this.state.toAccounts}/>

            <fieldset className={(this.state.errors.transferType)?'half-width error' : 'half-width'}>
              <label className='main-label'>Transfer Type</label>
              <input type='radio' name='rad_transferType' id='radTransferType_ott' value='One Time Transfer'
                onClick={(e: any) => this.changeTransfer(e)}/>
              <label htmlFor='radTransferType_ott'>One-Time Transfer</label><br/>
              <input type='radio' name='rad_transferType' id='radTransferType_at' value='Automatic Transfer'
                onClick={(e: any) => this.changeTransfer(e)}/>
              <label htmlFor='radTransferType_at'>Automatic Transfer</label>
            </fieldset>

            <fieldset className={(this.state.errors.amount)?'half-width right error' : 'half-width right'}>
              <label  className='main-label'>Amount</label>
              <i className='fa fa-dollar fa-fw'/>
              <input type='number' value={this.state.amount} onChange={this.changeAmount}/>
            </fieldset>

            {this.showHiddenFields(this.state.transferType)}

            <Memo onChange={(e: any) => this.changeMemo(e)} memo={this.state.memo} maxlen={120}/>

            <fieldset className='button-holder'>
              <input type='button' className='button simpleButton' value='Cancel' />
              <input type='submit' className='button CTAButton' value='Next' />
            </fieldset>

          </form>
        </div>
			);
		}
    else if (route === 'confirm') {
			return <Confirm form={this.state.form} setRoute={() => this.restart()}/>
		}
    else if (route === 'profile') {
      return <Profile />;
    }
    else if (route === 'contact') {
      return <Contact />;
    }
	}


// Principal helper functions :
  changeFrom = (event: any) => {
    const fromAccount = event.target.value;
    let toAccounts = [...this.state.fromAccounts];
    toAccounts = _.without(toAccounts,_.find(toAccounts,["id",fromAccount]));
    const toAccount = (fromAccount === this.state.toAccount) ? 0 : this.state.toAccount;
    this.setState({fromAccount,toAccounts, toAccount});
  }

  restart = () => {
    this.setState({
      route: "form",
      fromAccount: null,
      toAccount: null,
      transferType: "",
      amount: 0,
      memo: {
        text: "",
        len: 0
      },
      startDate: null,
      endDate: null,
      frequency: null,
      modal: false,
      form: [{}],
      errors: {
        startDate: null,
        transferType: null,
        toAccount: null,
        fromAccount: null,
        amount: 0,
      }
    })
  }

  setRoute(route: string){this.setState({route})}
  changeTo(event: any){this.setState({toAccount: event.target.value});}
  changeAmount(event: any){this.setState({amount: event.target.value});}
  changeMemo(event: any){this.setState({memo:{text:event.target.value,len:event.target.value.length}});}
  changeTransfer(event: any){this.setState({transferType: event.target.value, endDate:null, frequency:null});}
  changeFrequency(event: any){this.setState({frequency: event.target.value});}
  changeStartDate(event: any){this.setState({startDate: event.target.value});}
  changeEndDate(event: any){this.setState({endDate: event.target.value});}
  showModal(modal: any){this.setState({modal})}
  confirmSubmit(){this.setState({modal:false, route:"confirm" })}

   validate = () => {
    let valid = true;

    if (!(this as any).state.fromAccount) this.setState({ errors: {...this.state.errors, fromAccount:"From Account Field is Required"}});
    if (!(this as any).state.toAccount) this.setState({ errors: {...this.state.errors, toAccount:"To Account Field is Required"}});
    if (!(this as any).state.startDate) this.setState({ errors: {...this.state.errors, startDate:"Start Date Field is Required"}});
    if (!(this as any).state.amount) this.setState({ errors: {...this.state.errors, amount:"Amount Field is Required"}});
    if (!(this as any).state.transferType) this.setState({ errors: {...this.state.errors, transferType:"Transfer Type Field is Required"}});

    else if (this.state.transferType==="Automatic Transfer"){
      if (!this.state.endDate) this.setState({ errors: {...this.state.errors, endDate:"End Date Field is Required"}});
      if (!this.state.frequency) this.setState({ errors: {...this.state.errors, frequency:"Frequency Field is Required"}});
    }

    if (this.state.errors) valid = false;
    console.log(this.state.errors);
    return valid;
  }

	public render () {
    console.log(this.state);
		return (
			<div className='divMain'>
				<Header setRoute={this.setRoute.bind(this)}/>

        <section className='mainSection'>
					{this.router(this.state.route)}
				</section>

				<input type='checkbox' name='chkOpenMenu' id='chkOpenMenu' className='hide' />
				<label htmlFor='chkOpenMenu' className='lblOpenMenu smallDisplay'>
					<span className='openItem'></span>
					<span className='closeItem'></span>
				</label>

				<Footer/>

        <input type='checkbox' name='chkShowFooter' id='chkShowFooter' defaultChecked={true} className='hide' />
				{this.renderModal()}
			</div>
		);
	}
}

export default TransactionSummary;
