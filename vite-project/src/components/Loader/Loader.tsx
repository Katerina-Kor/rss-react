import { Component } from 'react';
import './loader.css';

class Loader extends Component {
  render(): JSX.Element {
    return (
      <div className="wrapper_loader">
        <span className="loader"></span>
      </div>
    );
  }
}

export default Loader;
