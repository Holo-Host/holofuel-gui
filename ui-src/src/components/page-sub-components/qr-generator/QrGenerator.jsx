import * as React from 'react';
// TODO: Update to the following QR Code base for TS...
// import { QRCode, ErrorCorrectLevel, QRNumber, QRAlphaNum, QR8BitByte, QRKanji } from 'qrcode-generator-ts/js';
import QRCode from 'qrcode'
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import styles from '../../styles/page-styles/DefaultPageMuiStyles'


class QrGenerator extends React.Component{
  constructor(props:Props){
    super(props);
    this.state = {
      qrPng: ""
    }
  };

  componentDidMount () {
    this.generateQR(this.props.agentHash);
  }

   generateQR = async text => {
    try {
      const qrPng = await QRCode.toDataURL(text);
      this.setState({ qrPng });
    } catch (err) { // DO WE NEED TO USE THIS STILL? agentData     return (
      console.error(err)
    }
  }

  render () {
    const { qrPng } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.center}>
        <div className={classes.QrCodeContainer}>
          <img src={qrPng} alt="Your QR Code" className={classes.QrCodeImg}/>
        </div>
        <h6 style={{color:'#eee', fontFamily:'Raleway', marginTop:'5px', fontSize:'6px'}}>{this.props.agentHash}</h6>
      </div>
    );
  }
}

export default withStyles(styles)(QrGenerator);
