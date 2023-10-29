import { Component } from 'react';
import { PersonResponse } from '../../types/apiResponseTypes';
import './personItem.css';
import BoldText from '../BoldText/BoldText';

type PersonItemProps = {
  personData: PersonResponse;
};
type PersonItemState = {
  homePlanet: string;
};

class PersonItem extends Component<PersonItemProps, PersonItemState> {
  constructor(props: PersonItemProps) {
    super(props);
    this.state = { homePlanet: '' };
  }

  render(): JSX.Element {
    return (
      <div className="item_person">
        <p>
          {<BoldText text="Name:" />} {` ${this.props.personData.name}`}
        </p>
        <p>
          {<BoldText text="Birth year:" />}
          {` ${this.props.personData.birth_year}`}
        </p>
        <p>
          {<BoldText text="Gender:" />} {` ${this.props.personData.gender}`}
        </p>
        <p>
          {<BoldText text="Hair color:" />}
          {` ${this.props.personData.hair_color}`}
        </p>
        <p>
          {<BoldText text="Skin color:" />}
          {` ${this.props.personData.skin_color}`}
        </p>
        <p>
          {<BoldText text="Height:" />} {` ${this.props.personData.height}`}
        </p>
      </div>
    );
  }
}

export default PersonItem;
