import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../index.js';

export class Recipe extends Component {
    constructor(props) {
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit(event) {
        store.dispatch({
            type: 'EDITING_RECIPE',
            state: this.props.recipe,
            index: this.props.index
        });
    }

    render() {
        return (
            <div>
                <Link to="/Gude-Foods/edit" onClick={this.handleEdit}><strong>{this.props.recipe.name}</strong>—&nbsp;</Link>
                {this.props.recipe.about.purpose} |&nbsp;
                {this.props.recipe.about.time} |&nbsp;
                {this.props.recipe.about.makes}
            </div>
        );
    }
}
