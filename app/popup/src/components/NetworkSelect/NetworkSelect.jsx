import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OutsideAlerter from './OutsideAlerter';
import DownIcon from '../Decorative/DownIcon/DownIcon';
import { toggleDropdownMessage } from '../../../../actions/dropdownActionMessages';

const NetworkSelect = ({ selectedNetwork, networks, dropdownVisible }) => (
  <OutsideAlerter>
    <div>
      <div style={{ width: '200px' }}>
        <span>{ selectedNetwork }</span>
        <span
          onClick={() => { toggleDropdownMessage(!dropdownVisible); }}
          role="button"
          tabIndex={0}
        >
          <DownIcon />
        </span>
      </div>

      {
        networks.length > 0 &&
        dropdownVisible &&
        <div>
          {
            networks.map((network) => (
              <div
                key={network.name}
              >
                { network.name }
              </div>
            ))
          }
        </div>
      }
    </div>
  </OutsideAlerter>
);

NetworkSelect.defaultProps = {
  selectedNetwork: '',
  networks: [],
  dropdownVisible: false
};

NetworkSelect.propTypes = {
  selectedNetwork: PropTypes.string,
  networks: PropTypes.array,
  dropdownVisible: PropTypes.bool
};

const mapStateToProps = (state) => {
  if (Object.keys(state).length === 0 && state.constructor === Object) return {};

  return {
    selectedNetwork: state.user.selectedNetwork.name,
    networks: state.user.networks,
    dropdownVisible: state.dropdown.visible
  };
};

export default connect(mapStateToProps)(NetworkSelect);
