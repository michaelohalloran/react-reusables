import React, { Component } from 'react';
import axios from 'axios';
import './EditableList.css';

class EditableList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            nameToUpdate: '',
            usernameToUpdate: '',
            updatingIdx: null,
        }
    }

    makeItemEditable = item => {
        //used later in cDM to add an editing prop to each fetched user
        item.editing = false;
        return item;
    }

    componentDidMount() {
        const url = 'https://jsonplaceholder.typicode.com/users';
        axios.get(url)
            .then(res => {
                return res.data;
            })
            .then(data => this.setState({users: data.map(this.makeItemEditable)}))
            .catch(err => console.log('Error: ', err));
    }

    toggleEditingMode = idx => {
        //grab this item by idx from array
        const {users} = this.state;
        let userToUpdate = users[idx];
        //toggle user's editing property (this renders or hides form)
        userToUpdate.editing = !userToUpdate.editing; 
        //put current user's name and un in state to pre-populate input later
        //only if we are in editing mode; otherwise reset to empty
        let currentName = userToUpdate.editing ? userToUpdate.name : '';
        let currentUsername = userToUpdate.editing ? userToUpdate.username: ''; 
        this.setState({
            users,
            usernameToUpdate: currentUsername,
            nameToUpdate: currentName,
        });      
    }

    //fires from input's onChange, also sets updatingText and updatingIdx
    updateText = (e, idx) => {
        // console.log('firing updateText', e.target.value);
        this.setState({
            [e.target.name]: e.target.value,
            updatingIdx: idx,
        });
    }

    handleEdit = e => {
        e.preventDefault();
        // console.log('clicked handleEdit this', this);
        // console.log('clicked handleEdit e', e.target);   
        //copy array
        const {users, nameToUpdate, usernameToUpdate, updatingIdx} = this.state;
        let itemToUpdate = {
            ...users[updatingIdx],
            username: usernameToUpdate,
            name: nameToUpdate,
            editing: false,
        }
        //copy stuff before and after updated item
        let start = users.slice(0,updatingIdx);
        let end = users.slice(updatingIdx + 1);
        // insert newly edited item into it
        this.setState({
            users: [...start, itemToUpdate, ...end],
            usernameToUpdate: '',
            nameToUpdate: '',
            updatingIdx: null,
        });
    }

    handleDelete = idx => {
        //filter this deleteIndex from copied state array
        const {users} = this.state;
        const newUsers = users.filter(user => user !== users[idx]);
        this.setState({users: newUsers});
    }

    render() {
        const {users, nameToUpdate, usernameToUpdate} = this.state;

        //later this can be a card component
        const userList = users.map((user,idx) => (
            <li key={user.id}>
                <p>Name: {user.name}</p>
                <p>Username: {user.username}</p>
                <button onClick={()=> this.toggleEditingMode(idx)}>Edit user info</button>
                <button onClick={()=>this.handleDelete(idx)}>Delete</button>
                {user.editing ? (
                    <form onSubmit={this.handleEdit}>
                        <input
                            name="nameToUpdate" 
                            placeholder={user.name}
                            value={nameToUpdate}
                            onChange={(e) => this.updateText(e,idx)} 
                        />
                        <input
                            name="usernameToUpdate" 
                            placeholder={user.username}
                            value={usernameToUpdate}
                            onChange={(e) => this.updateText(e,idx)} 
                        />
                        <button>Update</button>
                    </form>
                ) : null}
            </li>
        ));
    return (
      <div>
        <ul className="user-list">
            {userList}
        </ul>
      </div>
    )
  }
}

export default EditableList;