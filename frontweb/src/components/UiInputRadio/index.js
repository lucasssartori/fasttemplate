import React, { useRef, useEffect } from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { Container } from './styles';

export default function UiInputRadio({ name, label, options, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <div>
        <RadioGroup
          row
          aria-label="position"
          name={name}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        >
          {options.map(({ value, label: label_radio }) => (
            <FormControlLabel
              value={value}
              control={<Radio icon={<span className="icon, checkedIcon" />} />}
              label={label_radio}
              labelPlacement="end"
              className="radio"
            />
          ))}
        </RadioGroup>
      </div>
      {error && <span className="error">{error}</span>}
    </Container>
  );
}

UiInputRadio.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array,
};

UiInputRadio.defaultProps = {
  label: null,
  options: null,
};
