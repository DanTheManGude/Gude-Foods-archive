import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Edit extends Component {
  render() {
    return (
        <div>
            <p>
                Placeholder Edit page
                <Link to="/Gude-Foods/home" className="btn btn-lg btn-secondary">Home</Link>
                <Link to="/Gude-Foods/edit" className="btn btn-lg btn-secondary">Edit</Link>
            </p>
        </div>
    );
  }
}
