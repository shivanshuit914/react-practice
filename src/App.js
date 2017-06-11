import React, { Component } from 'react';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';
import Todos from './Components/Todos';
import uuid from 'uuid';
import $ from 'jquery';
import './App.css';

class App extends Component {
  // should not use to bind data.
  constructor() {
    super();
    this.state = {
      projects: [],
      todos: []
    }
  }

  // life cycle method.
  componentWillMount() {
    this.getProjects();
    this.getTodos();
  }

  getTodos(){
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({todos:data}, function() {
          console.log(this.state);
        })
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    })
  }

  getProjects(){
    this.setState({projects: [
      {
        id: uuid.v4(),
        title: 'Title 1',
        category: 'category'
      },
      {
        id: uuid.v4(),
        title: 'Title 2',
        category: 'category2'
      },
      {
        id: uuid.v4(),
        title: 'Title 3',
        category: 'category3'
      }
    ]});
  }

  componentDidMount() {
    this.getTodos();
  }

  handleAddProject(project) {
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects : projects});
  }

  handleDeleteProject(id) {
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);
    this.setState({projects : projects});
  }

  render() {
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject.bind(this)} />
        <h3>Project List</h3>
        <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />
        <hr />
        <Todos todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
