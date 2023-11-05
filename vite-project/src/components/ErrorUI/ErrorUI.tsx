import { FC, useState } from 'react';

type ErrorUIProps = {
  errorMessage: string;
};

const ErrorUI: FC<ErrorUIProps> = ({ errorMessage }) => {
  const [errorText] = useState<string>(
    errorMessage === 'Unauthorized.'
      ? 'Sorry, you are not authorized.'
      : errorMessage === 'Too Many Requests'
      ? 'Sorry, our server failed, try again in 10 minutes.'
      : 'Sorry, something went wrong...'
  );

  return (
    <div className="wrapper_error">
      <p className="text_error">{errorText}</p>
    </div>
  );
};

export default ErrorUI;
