import React, {Component} from 'react';
import './Form.css';

class Form extends Component {
    
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            users: [],
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        let newUser = {
            username: this.state.username,
            password: this.state.password,
        }

        this.setState((prevState)=> {
            return {
                username: '',
                password: '',
                users: [...prevState.users, newUser],
            }
        })
    }

    handleChange = e => {
        // console.log(`handleChange event: ${e.target.value}`);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className="login-form">
                <form onSubmit={this.handleSubmit}>
                    <input
                        className="login-form-username" 
                        type="text"
                        name="username"
                        onChange={this.handleChange}
                        value={this.state.username}
                        placeholder="Username"
                    />

                    <input
                        className="login-form-password" 
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        placeholder="Password"
                    />

                    <button className="login-form-btn">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default Form;