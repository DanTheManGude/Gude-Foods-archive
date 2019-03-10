import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../index.js';

export class Edit extends Component {
    render() {
        if (store.getState().editingRecipe == null) {
            return (
                <p>
                    Sorry, looks like something went wrong. Please return to the <a href="http://DanTheManGude.github.io/Gude-Foods">homepage</a>.
                </p>
            )
        }
        return (
            <div>
                <p>
                    <strong>{store.getState().editingRecipe.name}</strong>—&nbsp;
                    {store.getState().editingRecipe.about.purpose} |&nbsp;
                    {store.getState().editingRecipe.about.time} |&nbsp;
                    {store.getState().editingRecipe.about.makes}
                </p>
                <Link to="/Gude-Foods/home" className="btn btn-lg btn-secondary">Home</Link>
            </div>
        );
    }
}
