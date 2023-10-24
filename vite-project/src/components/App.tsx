import { Component } from 'react';
import './App.css';
import Section from './Section/Section';
import SearchForm from './Forms/SearchForm/SearchForm';

type AppProps = Record<string, never>;
type AppState = Record<string, never>;

class App extends Component<AppProps, AppState> {
  render(): JSX.Element {
    return (
      <div>
        <Section>
          <SearchForm />
        </Section>
        <Section></Section>
      </div>
    );
  }
}

export default App;
