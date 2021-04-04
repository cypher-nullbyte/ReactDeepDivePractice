import React,{Component} from 'react';
import Person from './Person/Person';
class Persons extends Component
{
  // static getDerivedStateFromProps(props,state)
  // {
  //   console.log('[Persons.js] this.staticGetDerivedStateFromProps');
  //   return state;
  // }

  
  shouldComponentUpdate(nextProps,nextState)
  {
    //Because we're checking for each props, We should rather extend React.PureComponent instead of Component. That will make sure that all props are already checked
    //in shouldComponentUpdate. Hence, in that case we need not to even define shouldComponentUpdate

    console.log('[Persons.js] shouldComponentUpdate');
    //shallow comparison. Hence we should use spread operator or .slice() while using state's values in App.js [Line 69-70] :)
    if(nextProps.persons!==this.props.persons 
      || nextProps.changed!==this.props.changed
      || nextProps.clicked!==this.props.clicked) 
      return true;
    return false;
  }
  getSnapshotBeforeUpdate(prevProps,prevState)
  {
    console.log('[Prsosns.js] getSnapshotBeforeUpdate');
    return {message:'Snapshot!'};
  }
  componentDidUpdate(prevProps,prevState,snapShot)
  {
    console.log('[Persons.js] componentDidUpdate');
    console.log(snapShot);
  }
  componentWillUnmount()
  {
    console.log('[Persons.js] componentWillUnmount');
  }
  render()
  {
    console.log("[Persons.js] rendering...");
    return this.props.persons.map((person, index) => {
      return (
        <Person
          click={() => this.props.clicked(index)}
          name={person.name}
          age={person.age}
          key={person.id}
          changed={event => this.props.changed(event, person.id)}
        />
      );
    })
  }

};
export default Persons;