import { Component, PropsWithChildren } from 'react';

type SectionProps = {
  className?: string;
};
type SectionState = Record<string, never>;

class Section extends Component<PropsWithChildren<SectionProps>, SectionState> {
  render(): JSX.Element {
    return (
      <section className={this.props.className}>{this.props.children}</section>
    );
  }
}

export default Section;
