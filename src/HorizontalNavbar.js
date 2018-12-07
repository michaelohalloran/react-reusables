import React, {Component} from 'react';
import './HorizontalNavbar.css';

class HorizontalNavbar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isAuth: null,
            name: '',
        }
    }

    componentDidMount() {
        //randomly set isAuth and name when mounting
        const random = Math.random();
        this.setState(()=> {
            return random > 0.5 ? 
            ({
                isAuth: true,
                name: 'Bob'
            }) : 
            ({
                isAuth: false,
                name: 'Visitor',
            });
        });
    }


    render() {
        const userLinks = (
            <ul class="nav-list">
                <li className="nav-link">
                    <a>Home</a>
                </li>
                <li className="nav-link">
                    <a>About</a>
                </li>
                <li className="nav-link">
                    <a>Logout</a>
                </li>
            </ul>
        );

        const visitorLinks = (
            <ul class="nav-list">
                <li className="nav-link">
                    <a>Home</a>
                </li>
                <li className="nav-link">
                    <a>Login</a>
                </li>
                <li className="nav-link">
                    <a>Register</a>
                </li>
            </ul>
        );
        
        let {isAuth} = this.state;

        const linkDisplay = isAuth ? userLinks : visitorLinks;
        
        return (
            <nav>
                {linkDisplay}
            </nav>
        );
    }
}

export default HorizontalNavbar;