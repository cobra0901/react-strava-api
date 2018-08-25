import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({id, name, label, value, onChange}) => {
  return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <div className="field">
          <input
              className="form-control"
              id={id}
              name={name}
              value={value}
              onChange={onChange}
              type="text"
          />
        </div>
      </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextInput;