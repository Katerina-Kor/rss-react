import { Component } from 'react';
import './errorButton.css';

type ErrorButtonProps = Record<string, never>;
type ErrorButtonState = {
  hasError: boolean;
};

class ErrorButton extends Component<ErrorButtonProps, ErrorButtonState> {
  constructor(props: ErrorButtonProps) {
    super(props);
    this.state = { hasError: false };
  }

  triggerError = () => {
    this.setState({ hasError: true });
  };

  render(): JSX.Element {
    if (this.state.hasError) {
      throw new Error('You triggered an error!');
    }
    return (
      <button onClick={this.triggerError} className="button button_error">
        click for error
      </button>
    );
  }
}

export default ErrorButton;
