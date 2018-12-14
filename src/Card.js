import React, { Component } from 'react';
import './Card.css';
import axios from 'axios';

class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    fetchUsers = () => {
        const url = 'https://jsonplaceholder.typicode.com/users';
        axios.get(url)
            .then(res => this.setState({users: res.data}))
            .catch(err => console.log('Error: ', err));
    }

    componentDidMount() {
        this.fetchUsers();
    }

  render() {
      const {users} = this.state;
      
      const userCards = users.map(user => (
        <div key={user.phone} className="card-container">
            <h2 className="card-header">{user.name}</h2>
            <p className="card-company">{user.company.name}</p>
            {/* <img alt={'Text'} /> */}
        </div>
        )
      );

    return (
      <div className="container">
          {userCards}
      </div>
    )
  }
}

export default Card;