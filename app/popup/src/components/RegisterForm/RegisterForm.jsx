import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'react-tooltip-lite';
import connect from '../../../../customRedux/connect';
import createForm from '../../../../customRedux/createForm';
import createField from '../../../../customRedux/createField';
import InputFormField from '../../../../commonComponents/InputFormField';
import withdrawFormValidator from '../Withdraw/withdrawFormValidator';
import { createUserAuthMessage } from '../../../../messages/userActionsMessages';
import { setRegisterFormTxPriceMessage } from '../../../../messages/formsActionsMessages';

import formStyle from '../../../../commonComponents/forms.scss';

const FORM_NAME = 'registerForm';

class RegisterForm extends Component {
  componentWillMount() {
    this.props.formData.setNumOfFields(1);
    this.GasPriceField = createField(InputFormField, this.props.formData);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.invalid) return;
    if (!this.props.form) return;
    if (Object.keys(this.props.form).length === 0) return;
    if ((newProps.form.gasPrice.value === this.props.form.gasPrice.value)) return;

    setRegisterFormTxPriceMessage();
  }

  render() {
    const GasPriceField = this.GasPriceField;

    return (
      <div>
        <form
          styleName="form-wrapper-2"
          onSubmit={(e) => { this.props.handleSubmit(e, createUserAuthMessage); }}
        >

          <GasPriceField
            name="gasPrice"
            showErrorText
            showLabel
            labelText="Gas price (Gwei):"
            type="number"
            value={this.props.gasPrice}
            wrapperClassName={formStyle['form-item-wrapper']}
            inputClassName={formStyle['form-item']}
            errorClassName={formStyle['form-item-error']}
          />

          {
            !this.props.invalid &&
            <div>
              <div styleName="tx-info">
                <span>Amount:</span>
                <div>
                  <span>{ this.props.currentFormTxVal.eth } ETH</span>
                  <span>{ this.props.currentFormTxVal.usd } USD</span>
                </div>
              </div>
              <div styleName="tx-info">
                <span>Max transaction fee:</span>
                <div>
                  <span>{ this.props.currentFormTxCost.eth } ETH</span>
                  <span>{ this.props.currentFormTxCost.usd } USD</span>
                </div>
              </div>
            </div>
          }

          <button
            className={formStyle['submit-button']}
            type="submit"
            disabled={
              this.props.pristine || this.props.invalid
            }
          >
            <Tooltip
              content={(
                <span>
                  { this.props.pristine && 'Form has not been touched' }
                  { this.props.invalid && 'Form is not valid, check errors' }
                </span>
              )}
              useHover={this.props.pristine || this.props.invalid}
              useDefaultStyles
            >
              Register Reddit username
            </Tooltip>
          </button>
        </form>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  formData: PropTypes.object.isRequired,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  gasPrice: PropTypes.number.isRequired,
  currentFormTxVal: PropTypes.string.isRequired,
  currentFormTxCost: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  currentFormTxVal: state.forms.currentFormTxVal,
  currentFormTxCost: state.forms.currentFormTxCost,
  gasPrice: state.account.gasPrice,
  form: state.forms[FORM_NAME]
});

const ExportComponent = createForm(FORM_NAME, RegisterForm, withdrawFormValidator);

export default connect(ExportComponent, mapStateToProps);
