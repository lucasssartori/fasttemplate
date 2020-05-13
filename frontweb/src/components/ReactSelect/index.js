import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { useField } from '@unform/core';

import { Container } from './styles';

const Select = ({ name, label, options, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'state.value',
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
    console.log(selectRef.current);
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <ReactSelect
        ref={selectRef}
        defaultValue={defaultValue}
        classNamePrefix="react-select"
        options={options}
        {...rest}
      />
      {error && <span>{error}</span>}
    </Container>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array,
};

Select.defaultProps = {
  label: null,
  options: null,
};

export default Select;
