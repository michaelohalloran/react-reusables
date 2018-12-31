import React, {Component} from 'react';
import './EditLifecycles.css';
import axios from 'axios';

class EditLifecycles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            item: '',
            editText: '',
            currentlyEditing: false,
            items: [],
            errors: [],
            completed: false,
            lifecycleCount: 0,
        }
    }


    cleanNewItems = item => {
        item.editing = false;
    }

    fetchTodos = ()=> {
        const {errors} = this.state;
        const url = 'https://jsonplaceholder.typicode.com/todos';
        axios.get(url)
            .then(res => res.data.slice(0,20))
            .then(data => {
                data.map(this.cleanNewItems);
                this.setState({
                    items: data
                })   
            })
            .catch(err => this.setState({errors: [...errors, err]}))
    }

    componentDidMount() {
        console.log('fired componentDidMount');
        this.fetchTodos();
    }
    
    static getDerivedStateFromProps(props, state) {
        console.log('fired getDerivedState');
        console.log('gDS state:', state.name);
        console.log('gDS props:', props.name);
        return {text: 'done'};
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('fired getSnapshot');
        console.log('snapshot prevProps: ', prevProps);
        console.log('snapshot prevState: ', prevState);
        return {text: 'Random string'};
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('fired shouldComponentUpdate');
        console.log('sCU nextProps: ', nextProps);
        console.log('sCU nextState: ', nextState);
        // return false;
        return true;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('fired componentDidUpdate');
        console.log('cDU prevProps: ', prevProps);
        console.log('cDU prevProps: ', prevState);
        console.log('cDU snapshot: ', snapshot);

    }

    componentWillUnmount() {console.log('fired componentWillUnmount')}



    onFormSubmit = e => {
        const {items, item} = this.state;
        e.preventDefault();
        let newItem = {
            editing: false,
            completed: false,
            id: items.length + 1,
            userId: Math.floor(Math.random()*items.length + 1),
            title: item,
        }

        this.setState({ 
            item: '',
            items: [...items, newItem],
        });
    }

    onEditSubmit = (e, todo) => {
        e.preventDefault();
        const {editText, items} = this.state;
        let editIdx = todo.id - 1;
        let itemToUpdate = items[editIdx];
        itemToUpdate = {
            editing: false,
            completed: todo.completed,
            title: editText,
            id: editIdx + 1,
            userId: todo.userId
        }
        let updatedItems = [...items.slice(0,editIdx), itemToUpdate, ...items.slice(editIdx+1)];

        this.setState({
            items: updatedItems,
            editText: '',
            currentlyEditing: false,
        });
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    toggleEditing = (e, todo) => {
        console.log('hit toggleEditing');
        e.stopPropagation();
        const {currentlyEditing} = this.state;
        //only one can be edited at a time:
        if (currentlyEditing) {
            return;
        } else {
            todo.editing = !todo.editing;
            this.setState({
                currentlyEditing: true,
                editText: todo.title,
            });
        }
    }

    toggleDone = (e, item) => {
        // console.log('hit toggleDone');
        // console.log('todo: ', item);
        e.stopPropagation();
        // console.log('todo status before: ', item.completed);
        item.completed = !item.completed;
        // console.log('todo status after: ', item.completed);
        //to force re-render and apply new class
        this.setState({completed: !this.state.completed});
    }

    onDeleteClick = deleteItem => {
        const {items} = this.state;
        let newItems = items.filter(item => item.title !== deleteItem.title);
        this.setState({items: newItems});
        //recalculate id numbers
    }

    renderTodo = todo => {
        const {editText} = this.state;
        return !todo.editing ? (
            <li onClick={(e)=> this.toggleDone(e, todo)} className={todo.completed ? 'done' : null} key={todo.id}>
                <p>{todo.id}. {todo.title}</p> 
                <button onClick={(e) => this.toggleEditing(e, todo)} className="edit-btn">Edit</button>
                <button onClick={() => this.onDeleteClick(todo)} className="delete-btn">Delete</button>
            </li>
        ) : (
            <form key={todo.id} onSubmit={(e) => this.onEditSubmit(e, todo)}>
                <input
                    type="text"
                    name="editText"
                    value={editText}
                    onChange={this.onInputChange}
                />
                <button>Update</button>
            </form>
        );
    }


    render() {

        console.log('fired render');

        const {items} = this.state;
        const todos = items.map(this.renderTodo);
        
        const todoDisplay = items ? (
            <ul>{todos}</ul>
        ): (
            <div>Loading...</div>
        );

        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <input 
                        type="text"
                        name="item"
                        value={this.state.item}
                        onChange={this.onInputChange}
                    />
                    <button className="submit-btn">Submit</button>
                </form>
    
                {todoDisplay}
            </div>
        );
    }
}

export default EditLifecycles;