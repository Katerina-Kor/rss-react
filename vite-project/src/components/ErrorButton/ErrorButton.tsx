import { FC, useState } from 'react';
import './errorButton.css';

const ErrorButton: FC = () => {
  const [hasError, setHasError] = useState<boolean>(false);

  const triggerError = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('You triggered an error!');
  }
  return (
    <button onClick={triggerError} className="button button_error">
      click for error
    </button>
  );
};

export default ErrorButton;
