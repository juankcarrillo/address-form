import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import AddressShapeWithValidation from '../../propTypes/AddressShapeWithValidation'
import InputSelect from './InputSelect'
import InputText from './InputText'
import InputLabel from './InputLabel'
import InputError from './InputError'
import PostalCodeLoader from '../../postalCodeFrom/PostalCodeLoader'
import { injectIntl, intlShape } from 'react-intl'

class Input extends Component {
  render() {
    const {
      field,
      options,
      address,
      autoFocus,
      inputRef,
      intl,
      shouldShowNumberKeyboard,
      disabled,
      value,
      onFocus,
      toggleNotApplicable,
    } = this.props
    const handleToggle = toggleNotApplicable
    const loading = disabled || !!address[field.name].loading
    const valid = address[field.name].valid
    const canBeOmitted = !!address[field.name].canBeOmitted
    console.log('ADDRESS FINAL', address)
    if (canBeOmitted) {
      return (
        <Fragment>
          {field.name}
          <input type="text" value={address[field.name].value} />

          Not applicable
          <input
            type="checkbox"
            onChange={handleToggle}
            value={address[field.name].notApplicable} />
        </Fragment>
      )
    }

    if (field.name === 'postalCode') {
      return (
        <InputLabel field={field}>
          <InputText
            field={field}
            className={loading ? 'loading-postal-code' : null}
            address={address}
            autoFocus={autoFocus}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            disabled={loading}
            inputRef={inputRef}
            type={shouldShowNumberKeyboard ? 'tel' : 'text'}
            value={value}
            onFocus={onFocus}
          />
          {loading && <PostalCodeLoader />}
          {field.forgottenURL && (
            <small>
              <a href={field.forgottenURL} target="_blank">
                {intl.formatMessage({ id: 'address-form.dontKnowPostalCode' })}
              </a>
            </small>
          )}
          {valid === false ? (
            <InputError reason={address[field.name].reason} />
          ) : null}
        </InputLabel>
      )
    }

    if (field.name === 'addressQuery') {
      return (
        <InputLabel field={field}>
          <InputText
            field={field}
            className={loading ? 'loading-postal-code' : null}
            address={address}
            autoFocus={autoFocus}
            placeholder={intl.formatMessage({
              id: `address-form.geolocation.example.${address.country.value}`,
              defaultMessage: intl.formatMessage({
                id: 'address-form.geolocation.example.UNI',
              }),
            })}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            disabled={loading}
            inputRef={inputRef}
            value={value}
            onFocus={onFocus}
          />
          {loading && <PostalCodeLoader />}
          {valid === false ? (
            <InputError reason={address[field.name].reason} />
          ) : null}
        </InputLabel>
      )
    }

    return (
      <InputLabel field={field}>
        {options ? (
          <InputSelect
            field={field}
            options={options}
            address={address}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            disabled={loading}
            inputRef={inputRef}
            value={value}
            onFocus={onFocus}
          />
        ) : (
          <InputText
            field={field}
            address={address}
            autoFocus={autoFocus}
            onChange={this.props.onChange}
            placeholder={
              !field.hidden && !field.required
                ? intl.formatMessage({ id: 'address-form.optional' })
                : null
            }
            onBlur={this.props.onBlur}
            disabled={loading}
            inputRef={inputRef}
            value={value}
            onFocus={onFocus}
          />
        )}
        {valid === false ? (
          <InputError reason={address[field.name].reason} />
        ) : null}
      </InputLabel>
    )
  }
}

Input.defaultProps = {
  inputRef: () => {},
  onBlur: () => {},
  autoFocus: false,
}

Input.propTypes = {
  field: PropTypes.object.isRequired,
  autoFocus: PropTypes.bool,
  options: PropTypes.array,
  address: AddressShapeWithValidation,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  inputRef: PropTypes.func,
  intl: intlShape,
  shouldShowNumberKeyboard: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  toggleNotApplicable: PropTypes.func,
}

export default injectIntl(Input)
