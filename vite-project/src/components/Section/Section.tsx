import { FC, PropsWithChildren } from 'react';
import './section.css';

type SectionProps = {
  className?: string;
};

const Section: FC<PropsWithChildren<SectionProps>> = (props) => {
  return (
    <section className={props.className ? props.className : ''}>
      {props.children}
    </section>
  );
};

export default Section;
