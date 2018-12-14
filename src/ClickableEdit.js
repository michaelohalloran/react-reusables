import React, {Component} from 'react';
import axios from 'axios';
import './ClickableEdit.css';
import { AsyncParallelBailHook } from 'tapable';

class ClickableEdit extends Component {

    state = {
        items: [],
        item: '',
        editedItemText: '',
        editedIdx: null,
        error: '',
        currentlyEditing: false,
    }


    addEditingProp = item => {
        item.editing = false;
        return item;
    }

    fetchTodos = () => {
        const url = 'https://jsonplaceholder.typicode.com/todos';
        axios.get(url)
            .then(res => {
                return res.data.slice(0,20).map(this.addEditingProp)
            })
            .then(data => this.setState({items: data}))
            .catch(err => this.setState({error: err}));
    }

    componentDidMount() {
        this.fetchTodos();
    }

    handleInputChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault();
        const {items, item} = this.state;
        //make item and include editing prop
        //also increment id based on array length
        const newItem = {
            title: item,
            id: items.length + 1,
            userId: Math.floor(Math.random()*items.length + 1),
            completed: false,
            editing: false
        }
        //add item to array
        this.setState({
            item: '',
            items: [...items, newItem]
        });
    }

    onEditSubmit = (e, idx) => {
        e.preventDefault();
        const {items, editedItemText} = this.state;
        console.log('array length: ', items.length);
        //find item from array using id
        let updated = items[idx];
        //replace with new fields to be updated
        updated = {...updated, title: editedItemText, editing: false}
        //reinsert at same spot in array, allow editing again
        this.setState({
            items: [...items.slice(0,idx), updated, ...items.slice(idx+1)],
            editedIdx: null,
            editedItemText: '',
            currentlyEditing: false,
        });
    }

    updateItem = updateIdx => {
        const {items} = this.state;
        //grab item from items array, toggle its editing property
        let itemToUpdate = items[updateIdx];
        itemToUpdate = {
            ...itemToUpdate, 
            editing: !itemToUpdate.editing,
        };
        //put it back in array at same spot
        let before = items.slice(0,updateIdx);
        let after = items.slice(updateIdx+1);
        this.setState({
            items: [...before, itemToUpdate, ...after],
        });
    }

    toggleEditing = idx => {
        const {items, currentlyEditing} = this.state;
        //if another todo is being edited, don't allow the rest of this to run
        if (currentlyEditing) {
            return;
        } else {
            let itemToUpdate = items[idx];
            //set editing updateIdx and text as well, so input opens pre-populated
            this.setState({
                currentlyEditing: true,
                editedIdx: idx,
                editedItemText: itemToUpdate.title, 
            });
            this.updateItem(idx);
        };
    }

    makeItemDisplay = item => {
        return item.editing ? (
            <form 
                className="edit-form"
                key={item.id} 
                onSubmit={(e)=>this.onEditSubmit(e, item.id - 1)}
            >
                <input 
                    type="text"
                    id="input"
                    name="editedItemText"
                    value={this.state.editedItemText}
                    onChange={this.handleInputChange}
                />
                <button>Update</button>
            </form>
            ) : (
                <div 
                    className="list-item-row" 
                    onClick={() => this.toggleEditing(item.id - 1)} 
                    key={item.id}
                >
                    <div className="list-item list-item-id" >
                        {item.id}
                    </div>
                    <div className="list-item list-item-text" >
                        {item.title}
                    </div>
                    <div className="list-item list-item-completed" >
                        {item.completed.toString()}
                    </div>
                </div>
            )
    }

    
    render() {

        const {items, editedItem} = this.state;

        //conditionally render li or input based on whether it is in/not in editing mode
        const itemList = items.map(this.makeItemDisplay);

        return (
            <div>
                <form className="todo-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        id="input"
                        name="item"
                        value={this.state.item}
                        onChange={this.handleInputChange}
                    />
                    <button>Add Item</button>
                </form>

                <div className="list-container">
                    <div className="list-item-row">
                        <div className="list-item list-item-id list-item-header__id" >
                            Id: 
                        </div>
                        <div className="list-item list-item-text list-item-header__text" >
                            Item:
                        </div>
                        <div className="list-item list-item-completed list-item-header__completed" >
                            Completed?
                        </div>
                    </div>
                    {itemList}
                </div>
            </div>
        );
    }
}

export default ClickableEdit;