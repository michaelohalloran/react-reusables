import React, {Component} from 'react';
// import Form from './Form';
// import SearchForm from './SearchForm';
// import EditableList from './EditableList';
// import HorizontalNavbar from './HorizontalNavbar.js'
// import Card from './Card';
// import ClickableEdit from './ClickableEdit.js';
import EditLifecycles from './EditLifecycles';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                {/* <Form /> */}
                {/* < SearchForm /> */}
                {/* < EditableList/> */}
                {/* < HorizontalNavbar /> */}
                {/* <Card /> */}
                {/* <ClickableEdit /> */}
                < EditLifecycles name='Bob'/>
            </div>
        );
    }
}

export default App;