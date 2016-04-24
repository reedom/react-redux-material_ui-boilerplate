import React, {Component, PropTypes} from "react";
import TodoItem from "./TodoItem";
import Footer from "./Footer";
import {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from "../constants/TodoFilters";
import {Checkbox, List} from "material-ui";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import * as MyRawTheme from "../material_ui_raw_theme_file";
import * as TodoActions from "../actions/todos";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import TodoTextInput from './TodoTextInput';

const defaultStyle = {
  width: 300,
  marginLeft: 20
};

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

class MainSection extends Component {
  static get childContextTypes() {
    return {muiTheme: React.PropTypes.object};
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(MyRawTheme)};
  }

  constructor(props, context) {
    super(props, context);
    this.state = {filter: SHOW_ALL};
  }

  handleClearCompleted() {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.completed);
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted();
    }
  }

  handleShow(filter) {
    this.setState({filter});
  }

  renderToggleAll(completedCount) {
    const {todos, actions} = this.props;
    if (todos.length > 0) {
      return (
        <Checkbox className="toggle-all"
                  style={{marginBottom: 10}}
                  label="Toggle All"
                  defaultChecked={completedCount === todos.length}
                  onCheck={actions.completeAll}/>
      );
    }
  }

  renderFooter(completedCount) {
    const {todos} = this.props;
    const {filter} = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted.bind(this)}
                onShow={this.handleShow.bind(this)}/>
      );
    }
  }
  
  handleSave(text) {
    if (text.length !== 0) {
      this.props.actions.addTodo(text);
    }
  }

  render() {
    const {todos, actions} = this.props;
    const {filter} = this.state;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce((count, todo) =>
        todo.completed ? count + 1 : count,
      0
    );

    return (
      <div>
        <h1 style={defaultStyle}>todos</h1>
        <TodoTextInput newTodo
                       onSave={this.handleSave.bind(this)}
                       placeholder="What needs to be done?"/>
        <section className="main" style={defaultStyle}>
          {this.renderToggleAll(completedCount)}
          <List className="todo-list">
            {filteredTodos.map(todo =>
              <TodoItem key={todo.id} todo={todo} {...actions} />
            )}
          </List>
          {this.renderFooter(completedCount)}
        </section>
      </div>
    );
  }
}

MainSection.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSection);
