import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { store } from '../index.js';

export class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {redirect: false};
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(event) {
        store.dispatch({
            type: 'DELETE_RECIPE',
            id: 0
        });
        this.setState({redirect: true});
    }

    render() {
        console.log(this);
        if (this.state.redirect) {
            return <Redirect push to="/Gude-Foods/home" />;
        }

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

                <div className="flex-container">
                    <button className="btn btn-danger flex-element" data-toggle="modal" data-target="#DeleteModal">Delete</button>
                    <Link to="/Gude-Foods/home" className="btn btn-secondary flex-element">Cancel</Link>
                    <Link to="/Gude-Foods/home" className="btn btn-success flex-element">Save</Link>
                </div>

                <div className="modal fade" id="DeleteModal" role="dialog">
                  <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title">Delete Recipe</h4>
                        <button type="button" className="close btn" data-dismiss="modal">&times;</button>
                      </div>
                      <div className="modal-body">
                        <p>
                            Are you sure you want to delete <strong>{store.getState().editingRecipe.name}</strong>?
                        </p>
                      </div>
                      <div className="modal-footer">
                        <div className="flex-container">
                            <button type="button" onClick={this.handleDelete} className="btn btn-danger flex-element" data-dismiss="modal">Delete</button>
                            <button type="button" className="btn btn-secondary flex-element" data-dismiss="modal">Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}
