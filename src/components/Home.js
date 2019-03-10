import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from './Recipe.js';
import { store } from '../index.js';

export class Home extends Component {
    render() {
        return (
            <div>
                <p>
                    Placeholder Home page
                    <Link to="/Gude-Foods/home" className="btn btn-lg btn-secondary">Home</Link>
                    <Link to="/Gude-Foods/edit" className="btn btn-lg btn-secondary">Edit</Link>
                </p>
                <div>
                <ul>
                    {store.getState().recipes.map(recipe =>
                        <li>
                            <Recipe state={recipe}/>
                        </li>
                    )}
                </ul>
                </div>
            </div>
        );
    }
}
