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
    console.log("PROPS : ", this.props);
    this.generateQR(this.props.agentHash);
  }

   generateQR = async text => {
    try {
      const qrPng = await QRCode.toDataURL(text);
      console.log(qrPng);
      this.setState({ qrPng });
    } catch (err) {
      console.error(err)
    }
  }

  render () {
    const { qrPng } = this.state;
    const { classes } = this.props;
    console.log('Props in QrGenerator:', this.props);

    return (
      <div className={classes.QrCodeContainer}>
        <img src={qrPng} alt="Your QR Code" className={classes.QrCodeImg}/>
      </div>
    );
  }
}

export default withStyles(styles)(QrGenerator);