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
            type: 'EDIT_RECIPE',
            state: this.props.state
        });
    }

    render() {
        return (
            <div>
                <Link to="/Gude-Foods/edit" onClick={this.handleEdit}><strong>{this.props.state.name}</strong>—&nbsp;</Link>
                {this.props.state.about.purpose} |&nbsp;
                {this.props.state.about.time} |&nbsp;
                {this.props.state.about.makes}
            </div>
        );
    }
}
