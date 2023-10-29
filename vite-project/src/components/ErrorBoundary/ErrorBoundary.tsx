import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';
import './errorBoundary.css';

type ErrorBoundaryProps = NonNullable<unknown>;
type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  onReset = () => {
    this.setState({ hasError: false });
  };

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(error.toString());
    console.error(info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="wrapper_error">
          <p className="text_error">Sorry, something went wrong...</p>
          <button className="button button_restart" onClick={this.onReset}>
            try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
