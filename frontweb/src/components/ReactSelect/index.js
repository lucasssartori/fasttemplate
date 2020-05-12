import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { useField } from '@unform/core';

import { Container } from './styles';

export default function Select({ name, label, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [value, setValue] = useState([]);

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
  }, [fieldName, registerField, rest.isMulti]);

  useEffect(() => {
    setValue({
      value: defaultValue,
      label: defaultValue,
    });
  }, [defaultValue]);

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <ReactSelect
        defaultValue={value[0]}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
      {error && <span>{error}</span>}
    </Container>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

Select.defaultProps = {
  label: null,
};
