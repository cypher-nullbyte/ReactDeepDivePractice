import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';
// import WithClass_ from '../hoc/WithClass_';
import AuthContext from '../context/auth-context';


export default class App extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      persons: [
        { id: 'asfa1', name: 'Cypher', age: 26 },
        { id: 'vasdf1', name: 'Nullbyte', age: 29 },
        { id: 'asdf11', name: 'Chiya', age: 5 }
      ],
      otherState: 'some other value',
      showPersons: false,
      showCockpit:true,
      changeCounter:0,
      authenticated:false
    };
  }

  static getDerivedStateFromProps(props,state)
  {
    console.log("[App.js] getDerivedStateFromProps",props);
    return state;
  }
  componentDidMount()
  {
    console.log("[App.js] componentDidMount");
  }

  shouldComponentUpdate(nextProps,nextState)
  {
    console.log("[App.js] shouldComponentUpdate");
    return true;
  }

  componentDidUpdate()
  {
    console.log("[App.js] componentDidUpdate");
  }
  
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState,props)=>({ persons: persons,changeCounter:prevState.changeCounter+1}));
  };

  deletePersonHandler = personIndex => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };
  loginHandler=()=>
  {
    this.setState({authenticated:true});
  }
  logoutHandler=()=>
  {
    this.setState({authenticated:false});
  }
  render() {
    console.log("[App.js] render");
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler} 
            changed={this.nameChangedHandler}
            isAuthenticated={this.state.authenticated}/>
        </div>
      );

    }
    return (
      <WithClass classes={classes.App}>
        <button onClick={()=>{this.setState({showCockpit:!this.state.showCockpit})}}>Toggle Cockpit</button>
        <AuthContext.Provider value={{authenticated:this.state.authenticated,login:this.loginHandler, logout:this.logoutHandler}}>
          {this.state.showCockpit? 
          <Cockpit login={this.loginHandler} title={this.props.appTitle} showPersons={this.state.showPersons} personsLength={this.state.persons.length} clicked={this.togglePersonsHandler}/>
          : null
          }
          {persons}
        </AuthContext.Provider>
      </WithClass>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

// export default Withclass_(App,classes.App);
