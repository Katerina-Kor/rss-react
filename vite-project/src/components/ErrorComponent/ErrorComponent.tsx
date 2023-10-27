import { Component } from 'react';
import './errorComponent.css';

type ErrorComponentProps = Record<string, never>;
type ErrorComponentState = Record<string, never>;

class ErrorComponent extends Component<
  ErrorComponentProps,
  ErrorComponentState
> {
  restart(): void {
    location.reload();
  }

  render(): JSX.Element {
    return (
      <div className="wrapper_error">
        <p className="text_error">Sorry, something went wrong...</p>
        <button className="button button_restart" onClick={this.restart}>
          try again
        </button>
      </div>
    );
  }
}

export default ErrorComponent;
