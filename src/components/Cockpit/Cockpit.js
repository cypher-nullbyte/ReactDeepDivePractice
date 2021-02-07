import React,{useEffect,useRef,useContext} from 'react';
import AuthContext from '../../context/auth-context';
import classes from './Cockpit.css';

const Cockpit=(props)=>
{
    // const toggleBtnRef=React.createRef(); //not supported in Functional components. Use React-hook useRef
    const toggleBtnRef=useRef(null);
    const authContext=useContext(AuthContext);

    useEffect(()=>{
      console.log("[Cockpit.js] useEffect");
      // const timer=setTimeout(()=>{
      //   alert("Saved Data to Cloud");
      // },5000);
      // toggleBtnRef.current.click();
      return ()=>{
        // clearTimeout(timer);
        console.log('[Cockpit.js] cleanup work in useEffect (similar to componentWillUnmount in Lifecycle-hooks');
      }
    },[]); //If this array is empty, means nothing to be re-rendered. Hence it runs only once.
    //If you want to run when there is any update in persons state; Then add 'props.persons' to empty array.

    useEffect(()=>
    {
      console.log("[Cockpit.js] 2nd useEffect");
      return ()=>{
        console.log('[Cockpit.js] cleanup work in 2nd useEffect ');
      }
    });
    const btnClass=props.showPersons?classes.Red:'';
    const assignedClasses = [];
    if (props.personsLength <= 2) {
      assignedClasses.push(classes.red); // classes = ['red']
    }
    if (props.personsLength <= 1) {
      assignedClasses.push(classes.bold); // classes = ['red', 'bold']
    }
    return(
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>
            Toggle Persons
            </button>
            {/* <AuthContext.Consumer>{(context)=><button onClick={context.login}>Log in</button>}
            </AuthContext.Consumer> */}
            <button onClick={authContext.login}>Log in</button>
            <button onClick={authContext.logout}>Log out</button>
        </div>
    )
}
export default React.memo(Cockpit);