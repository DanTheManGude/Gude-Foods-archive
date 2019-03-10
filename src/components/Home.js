import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from './Recipe.js';
import { store } from '../index.js';

export class Home extends Component {
    render() {
        return (
            <div>
                <ul id="RecipeList">
                    {store.getState().recipes.map(recipe =>
                        <li>
                            <Recipe state={recipe}/>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}
