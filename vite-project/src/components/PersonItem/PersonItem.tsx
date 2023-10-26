import { Component } from 'react';
import { PersonResponse } from '../../types/apiResponseTypes';
// import { getPlanetData } from '../../api/apiRequests';
import './personItem.css';

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

  // componentDidMount(): void {
  //   this.setHomePlanetName();
  // }

  // componentDidUpdate(prevProps: PersonItemProps): void {
  //   if (this.props.personData.homeworld !== prevProps.personData.homeworld) {
  //     this.setHomePlanetName();
  //   }
  // }

  // setHomePlanetName = async () => {
  //   const planetData: PlanetResponse = await getPlanetData(
  //     this.props.personData.homeworld
  //   );
  //   this.setState({ homePlanet: planetData.name });
  // };

  render(): JSX.Element {
    return (
      <div className="item_person">
        <p>{`Name: ${this.props.personData.name}`}</p>
        <p>{`Birth year: ${this.props.personData.birth_year}`}</p>
        <p>{`Gender: ${this.props.personData.gender}`}</p>
        <p>{`Hair color: ${this.props.personData.hair_color}`}</p>
        <p>{`Skin color: ${this.props.personData.skin_color}`}</p>
        <p>{`Height: ${this.props.personData.height}`}</p>
        {/* <p>{`Home world: ${this.state.homePlanet}`}</p> */}
      </div>
    );
  }
}

export default PersonItem;
