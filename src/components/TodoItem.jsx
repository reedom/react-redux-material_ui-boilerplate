import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';
import {ListItem, IconButton} from 'material-ui';
import * as Styles from 'material-ui/styles'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import CheckBoxIcon from 'material-ui/svg-icons/toggle/check-box';
import CheckBoxBlankIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank';

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleEdit() {
    this.setState({editing: true});
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text);
    }
    this.setState({editing: false});
  }

  render() {
    const {completeTodo, deleteTodo} = this.props;
	const {id, completed, text} = this.props.todo.toObject();

    const rightIconMenu = (
      <IconMenu iconButtonElement={
          <IconButton>
            <MoreVertIcon color={Styles.colors.grey400} />
          </IconButton>
        }
      >
        <MenuItem primaryText="Edit" onTouchTap={() => this.handleEdit()}/>
        <MenuItem primaryText="Delete" onTouchTap={() => deleteTodo(id)}/>
      </IconMenu>
    );

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput text={text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(id, text)}/>
      );
    } else {
      element = (
        <ListItem primaryText={text}
                  onTouchTap={() => completeTodo(id)}
                  leftIcon={completed ? <CheckBoxIcon /> : <CheckBoxBlankIcon />}
                  rightIconButton={rightIconMenu}
        />
      );
    }

    return (
      <div className={classnames({
          completed: completed,
          editing: this.state.editing
        })}>
        {element}
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired
};

export default TodoItem;
