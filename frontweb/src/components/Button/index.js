import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Button({ title, loading, IconButton, ...rest }) {
  return (
    <Container {...rest} loading={loading ? 1 : 0}>
      {loading ? (
        <FaSpinner color="#fff" size={20} />
      ) : (
        <div>
          {IconButton && <IconButton color="#fff" size={20} />}
          {title && <p>{title}</p>}
        </div>
      )}
    </Container>
  );
}

Button.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  IconButton: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

Button.defaultProps = {
  title: null,
  loading: false,
  IconButton: null,
};
