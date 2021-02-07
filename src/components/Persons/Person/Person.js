import React,{Component} from 'react';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass_.js';
import classes from './Person.css';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
  constructor(props)
  {
    super(props);
    this.inputElementRef=React.createRef();
  }
  static contextType=AuthContext;
  componentDidMount()
  {
    this.inputElementRef.current.focus();
    console.log(this.context.authenticated);
  }
  render()
  {
    console.log("[Person.js] rendering...");
    return (
      <Aux>
        <AuthContext.Consumer>
        {(context)=>context.authenticated? <p>Authenticated!</p>:<p>Please Log In!</p>}
        </AuthContext.Consumer>
       <div className={''/*classes.Person*/}>
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input ref={this.inputElementRef} type="text" onChange={this.props.changed} value={this.props.name} />
        </div>
      </Aux>
    );
  }
};

//for this feautre install "prop-types" using NPM
//It is officially provided by React Community, but we've to install it separately
Person.propTypes={
  click:PropTypes.func,
  name:PropTypes.string,
  Age:PropTypes.number,
  changed:PropTypes.func 
};
export default withClass(Person,classes.Person);
