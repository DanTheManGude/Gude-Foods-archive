import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../index.js';

export class Recipe extends Component {
    constructor(props) {
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
        this.state = {expand: false};
    }

    handleEdit(event) {
        store.dispatch({
            type: 'EDITING_RECIPE',
            state: this.props.recipe,
            index: this.props.index
        });
    }

    render() {
        var expandText;
        var expandStyle;
        if (this.state.expand){
            expandText = <i className="fas fa-caret-down"></i>;
            expandStyle = {display: ''};
        }
        else {
            expandText = <i className="fas fa-caret-right"></i>;
            expandStyle = {display: 'none'};
        }

        return (
            <div>
                <span>
                    <button className="btn-link btn" onClick={() => {
                        this.setState({expand: !this.state.expand})
                    }}>{expandText}</button>
                    <strong>{this.props.recipe.name}</strong>—&nbsp;
                    {this.props.recipe.about.purpose} |&nbsp;
                    {this.props.recipe.about.time} |&nbsp;
                    {this.props.recipe.about.makes} |&nbsp;
                    <Link to="/Gude-Foods/edit" onClick={this.handleEdit}><i className="fa fa-cogs" aria-hidden="true"></i></Link>
                </span>
                <ul style={expandStyle}>
                    <li>Notes: {this.props.recipe.notes}</li>
                    <li>Ingredients:</li>
                    <ul>
                        {this.props.recipe.ingredients.map(ingredient =>
                            <li>
                                {ingredient.quantity} of {ingredient.what}
                            </li>
                        )}
                    </ul>
                    <li>Procedure:</li>
                    <ol>
                        {this.props.recipe.procedure.map(step =>
                            <li>
                                {step}
                            </li>
                        )}
                    </ol>
                </ul>
            </div>
        );
    }
}
