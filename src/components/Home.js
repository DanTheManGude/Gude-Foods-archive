import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
  render() {
    return (
        <div>
            <p>
                Placeholder Home page
                <Link to="/Gude-Foods/home" class="btn btn-lg btn-secondary">Home</Link>
                <Link to="/Gude-Foods/edit" class="btn btn-lg btn-secondary">Edit</Link>
            </p>
        </div>
    );
  }
}
