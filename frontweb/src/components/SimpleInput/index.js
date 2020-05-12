import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { Container } from './styles';

export default function Input({ name, label, IconInput, ...rest }) {
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
        <span>{IconInput && <IconInput size={22} color="#999999" />}</span>
        <input
          id={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />
      </div>
      {error && <span className="error">{error}</span>}
    </Container>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  IconInput: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

Input.defaultProps = {
  label: null,
  IconInput: null,
};
