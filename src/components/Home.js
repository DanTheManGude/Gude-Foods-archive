import React, { Component } from 'react';
import { Recipe } from './Recipe.js';
import { store } from '../index.js';

export class Home extends Component {
    render() {
        return (
            <div>
                <ul id="RecipeList">
                    {store.getState().recipes.map((recipe, index) =>
                        <li key={index}>
                            <Recipe index={index} recipe={recipe}/>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}
