import { Component } from 'react';

type HeadingProps = {
  level: number;
  title: string;
  className?: string;
};
type HeadingState = Record<string, never>;

class Heading extends Component<HeadingProps, HeadingState> {
  className = this.props.className ? `title ${this.props.className}` : `title`;
  render() {
    switch (this.props.level) {
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
      case 1:
      default:
        return <h1 className={this.className}>{this.props.title}</h1>;
    }
  }
}

export default Heading;
