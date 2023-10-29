import { Component } from 'react';
import './boldText.css';

type BoldTextProps = {
  text: string;
};
type BoldTextState = Record<string, never>;

class BoldText extends Component<BoldTextProps, BoldTextState> {
  render(): JSX.Element {
    return <span className="bold">{this.props.text}</span>;
  }
}

export default BoldText;
