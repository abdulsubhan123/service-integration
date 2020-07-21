import React, {Component } from 'react';
import axios from 'axios';


class App extends Component{
    state = {
      persons: [],
    }
 
  componentDidMount(){
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        console.log(res);
        this.setState({persons: res.data});
      })
      .catch((err) =>{
        console.log(err);
      })
      
  }
  render(){
   return(
     <div className="App">
       <h1>Serice Integration using axios</h1>
       <h1>Get Data</h1>
       <ul>
        {this.state.persons.map(person => (<li key={person.id}>{person.name}</li>))}
       </ul>

       <Posting />
       <Delete />
       <Update />
       <Sample />
       <Form />
       <NameForm />
      
     </div>
   );
}
}

class Posting extends Component{

  state = {
    name: '',
  };
  handleChange = event => {
    this.setState({name : event.target.value})
  }
  handleSubmit = event => {
    event.preventDefault();

    const user = {
      name: this.state.name
    }
    axios.post("https://jsonplaceholder.typicode.com/users", { user })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch((err) =>{
      console.log(err);
    })
    
    
  }
  render(){
    return(
      <div>
        <h1>Post data</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
            <input  type="text" name="name" onChange={this.handleChange}/>
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

class Delete extends Component{

  state = {
    id: '0',
  };
  handleChange = event => {
    this.setState({id : event.target.value})
  }
  handleSubmit = event => {
    event.preventDefault();

    axios.delete("https://jsonplaceholder.typicode.com/users/{this.state.id}")
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch((err) =>{
        console.log(err);
      })  
  }
  render(){
    return(
      <div>
        <h1>Delete data</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person Id:
            <input  type="number" name="name" onChange={this.handleChange}/>
          </label>
          <button type="submit">Delete</button>
        </form>
      </div>
    )
  }
}

class Update extends Component{

  update(){

    const user = {
      "userId": "1234",
      "id": "1234",
      "title": 'sample-title',
      "body": 'sample-body',
    }
    axios.put("https://jsonplaceholder.typicode.com/posts/1",user)
    .then((user) => {
      console.log(user);
    
    })
    .catch((err) =>{
      console.log(err);
    })
  }
  render(){
    return(
      <div>
        <h1>Update data</h1>
          <button onClick={this.update}>Update</button>
     </div>
    )
  }
}


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
   
  }
  
  render() {
    if (this.state.errorInfo) {
    
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
  
    return this.props.children;
  }  
}

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
  }
  
  render() {
    if (this.state.counter === 5) {
     
      throw new Error('I crashed!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}

class Sample extends Component {
  render(){
  return (
    <div>
      <h1>Error Boundaries</h1>
      <p>
          Click on the numbers to increase the counters.
      
          The counter is programmed to throw when it reaches 5. This simulates a JavaScript error in a component.
        
      </p>
      <ErrorBoundary>
        <p>These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.</p>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>
      
      <p>These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.</p>
      <ErrorBoundary><BuggyCounter /></ErrorBoundary>
      <ErrorBoundary><BuggyCounter /></ErrorBoundary>
    </div>
  )
}}
class Form extends Component{
  render(){
    return(
        <div>
          <h1>Forms & Controlled Components</h1>
          <form>
            <label>
              Name:
              <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
    )
  }
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <Lifting />
      </div>
    );
  }
}


class Lifting extends Component{

  state ={
    count:0,
  };

  increment = () => {
    this.setState({
      count:this.state.count + 1
    });
  };
  decrement = () => {
    this.setState({
      count:this.state.count - 1
    });
  };
  render(){
    return(
      <div>
        <h1>Lifting State Up</h1>
        <Counter count={this.state.count} increment={this.increment} decrement={this.decrement} />
        <Counter count={this.state.count} increment={this.increment} decrement={this.decrement} />
      </div>
    )
  }
}

class Counter extends Component{
  render(){
    return(
      <div>
        <div>Count:{this.props.count}</div>
        <button onClick={this.props.increment}>Increment</button>
        <button onClick={this.props.decrement}>Decrement</button>
      </div>
    )
  }
}



export default App;
