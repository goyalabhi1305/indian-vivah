import React from 'react';
import { HelperText } from 'react-native-paper';

const FieldHelperText = ({ error }) => {
  return error ? (
    <HelperText type="error" visible={!!error}>
      {error}
    </HelperText>
  ) : null;
};

export default FieldHelperText;
