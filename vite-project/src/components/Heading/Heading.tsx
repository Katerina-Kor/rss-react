import { Component } from 'react';
import { headingLevel } from '../../types/headingTypes';
import './heading.css';

type HeadingProps = {
  level: headingLevel;
  title: string;
  className?: string;
};
type HeadingState = Record<string, never>;

class Heading extends Component<HeadingProps, HeadingState> {
  className = this.props.className
    ? `heading heading_${this.props.level} ${this.props.className}`
    : `heading heading_${this.props.level}`;
  render() {
    switch (this.props.level) {
      case 1:
        return <h1 className={this.className}>{this.props.title}</h1>;
      case 2:
        return <h2 className={this.className}>{this.props.title}</h2>;
      case 3:
        return <h3 className={this.className}>{this.props.title}</h3>;
      case 4:
        return <h4 className={this.className}>{this.props.title}</h4>;
      case 5:
        return <h5 className={this.className}>{this.props.title}</h5>;
      case 6:
        return <h6 className={this.className}>{this.props.title}</h6>;
    }
  }
}

export default Heading;
