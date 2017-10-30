import React from 'react';
import PropTypes from 'prop-types';
import connect from '../../../../customRedux/connect';
import { getEtherScanLinkByNetwork } from '../../../../actions/utils';
import { createUserAuthMessage } from '../../../../messages/userActionsMessages';
import Tabs from '../Tabs/Tabs';

import './dashboard.scss';

const Dashboard = ({
  address, balance, verifiedUsername, tipsBalance, registering, registeringError, registeringUsername
}) => (
  <div styleName="dashboard-wrapper">
    <div styleName="account-info-wrapper">
      <div styleName="small-section">
        <div styleName="small-section-title">Address</div>
        <a
          href={getEtherScanLinkByNetwork('kovan', address)}
          target="_blank"
          rel="noopener"
        >
          { address }
        </a>
      </div>

      <div styleName="small-section">
        <div styleName="small-section-title">Username</div>
        <div>
          { !registering && !registeringError && !verifiedUsername && <span styleName="error">Not registered</span> }
          { !registering && registeringError && <span styleName="error">There was an error, try again</span> }
          { registering && <span>Registering /u/{ registeringUsername } </span> }
          { verifiedUsername && <span>{ verifiedUsername }</span> }
        </div>
      </div>

      <div styleName="large-section-wrapper">
        <div styleName="large-section">
          <div styleName="large-section-title">
            Balance (ETH):
          </div>
          <div styleName="large-section-balance">
            { balance }
          </div>
          <div styleName="large-section-btn">
            Send
          </div>
        </div>

        {
          verifiedUsername &&
          <div styleName="large-section">
            <div styleName="large-section-title">
              Tips (ETH):
            </div>
            <div styleName="large-section-balance">
              { tipsBalance }
            </div>
            <div styleName="large-section-btn">
              Withdraw
            </div>
          </div>
        }
      </div>
    </div>

    {
      !registering &&
      !verifiedUsername &&
      <button onClick={createUserAuthMessage} styleName="register-btn">
        Register Reddit username
      </button>
    }
    {
      registering && <div styleName="registering-info">Username is currently being registered. Please wait...</div>
    }
    {
      !registering &&
      verifiedUsername &&
      <Tabs />
    }
  </div>
);

Dashboard.propTypes = {
  address: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired,
  verifiedUsername: PropTypes.string.isRequired,
  tipsBalance: PropTypes.string.isRequired,
  registeringError: PropTypes.string.isRequired,
  registering: PropTypes.bool.isRequired,
  registeringUsername: PropTypes.string.isRequired

};

const mapStateToProps = (state) => ({
  address: state.account.address,
  balance: state.account.balance,
  verifiedUsername: state.user.verifiedUsername,
  tipsBalance: state.account.tipsBalance,
  registering: state.user.registering,
  registeringError: state.user.registeringError,
  registeringUsername: state.user.registeringUsername
});

export default connect(Dashboard, mapStateToProps);

