import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { store } from '../index.js';
import { firebase } from "./App.js";

export class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {redirect: false};
    }

    handleName(event) {
        this.updateEditing({...store.getState().editingRecipe.recipe,name: event.target.value});
    }

    handlePurpose(event) {
        var newAbout = {...store.getState().editingRecipe.recipe.about, purpose: event.target.value}
        this.updateEditing({...store.getState().editingRecipe.recipe,about: newAbout});
    }

    handleTime(event) {
        var newAbout = {...store.getState().editingRecipe.recipe.about, time: event.target.value}
        this.updateEditing({...store.getState().editingRecipe.recipe,about: newAbout});
    }

    handleMakes(event) {
        var newAbout = {...store.getState().editingRecipe.recipe.about, makes: event.target.value}
        this.updateEditing({...store.getState().editingRecipe.recipe,about: newAbout});
    }

    handleQuantity(index, event) {
        var newIngredients = store.getState().editingRecipe.recipe.ingredients;
        newIngredients[index].quantity = event.target.value;
        this.updateEditing({...store.getState().editingRecipe.recipe,ingredients: newIngredients});
    }

    handleWhat(index, event) {
        var newIngredients = store.getState().editingRecipe.recipe.ingredients;
        newIngredients[index].what = event.target.value;
        this.updateEditing({...store.getState().editingRecipe.recipe,ingredients: newIngredients});
    }

    handleNewIngredient(){
        var newIngredients = store.getState().editingRecipe.recipe.ingredients;
        newIngredients.push({quantity: "New Quantity", what: "New What"});
        this.updateEditing({...store.getState().editingRecipe.recipe,ingredients: newIngredients});
    }

    handleStep(index, event) {
        var newProcedure = store.getState().editingRecipe.recipe.procedure;
        newProcedure[index] = event.target.value;
        this.updateEditing({...store.getState().editingRecipe.recipe,procedure: newProcedure});
    }

    handleNewStep(){
        var newProcedure = store.getState().editingRecipe.recipe.procedure;
        newProcedure.push("New Step");
        this.updateEditing({...store.getState().editingRecipe.recipe,procedure: newProcedure});
    }

    updateEditing(state){
        store.dispatch({
            type: 'EDITING_RECIPE',
            state: state,
            index: store.getState().editingRecipe.index
        });
    }

    handleDelete(event) {
        store.dispatch({
            type: 'DELETE_RECIPE',
            index: store.getState().editingRecipe.index
        });
        this.clearEditing();
        this.updateFirebase();
    }

    handleCancel(event) {
        this.clearEditing();
    }

    handleSave(event) {
        store.dispatch({
            type: 'EDIT_RECIPE',
            state: store.getState().editingRecipe.recipe,
            index: store.getState().editingRecipe.index
        });
        this.clearEditing();
        this.updateFirebase();
    }

    clearEditing() {
        store.dispatch({
            type: 'EDITING_RECIPE',
            state: null,
            index: -1
        });
        this.setState({redirect: true});
    }

    updateFirebase(){
        try{
            firebase.database().ref('recipes').set(store.getState().recipes);
            store.dispatch({
                type: 'ADD_BANNER',
                message: "Successfully updated the recipes.",
                'kind': 'alert-success'
            });
        }
        catch(error) {
            store.dispatch({
                type: 'ADD_BANNER',
                message: "Something went wrong trying to update the recipies.",
                'kind': 'alert-danger'
            });
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error " + errorCode + ": " + errorMessage);
        };
    }

    render() {
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
                <div className="form-inline">
                    <label className="control-label col-sm-2">Name: </label>
                    <input type="text" className="form-control" placeholder="Name" value={store.getState().editingRecipe.recipe.name} onChange={this.handleName.bind(this)}/>
                </div>
                <br/>
                <div className="form-inline">
                    <label className="control-label col-sm-2">Purpose: </label>
                    <input type="text" className="form-control" placeholder="Purpose" value={store.getState().editingRecipe.recipe.about.purpose} onChange={this.handlePurpose.bind(this)}/>
                </div>
                <br/>
                <div className="form-inline">
                    <label className="control-label col-sm-2">Time: </label>
                    <input type="text" className="form-control" placeholder="Time" value={store.getState().editingRecipe.recipe.about.time} onChange={this.handleTime.bind(this)}/>
                </div>
                <br/>
                <div className="form-inline">
                    <label className="control-label col-sm-2">Makes: </label>
                    <input type="text" className="form-control" placeholder="Makes" value={store.getState().editingRecipe.recipe.about.makes} onChange={this.handleMakes.bind(this)}/>
                </div>
                <br/>
                <div className="form-inline">
                    <label className="control-label col-sm-2">Ingredients: </label>
                    <ul>
                        {store.getState().editingRecipe.recipe.ingredients.map((ingredient, index) =>
                            <li>
                                <div className="form-inline">
                                    <label className="control-label">Quantity: &nbsp; </label>
                                    <input key={index} type="text" className="form-control" placeholder="Quantity" value={ingredient.quantity} onChange={this.handleQuantity.bind(this, index)}/>
                                    &nbsp; &nbsp; &nbsp;
                                    <label className="control-label">What: &nbsp; </label>
                                    <input type="text" className="form-control" placeholder="What" value={ingredient.what} onChange={this.handleWhat.bind(this, index)}/>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
                <button type="button" onClick={this.handleNewIngredient.bind(this)} className="btn btn-info">Add Ingredient</button>
                <br/>
                <div className="form-inline">
                    <label className="control-label col-sm-2">Procedure: </label>
                    <ol>
                        {store.getState().editingRecipe.recipe.procedure.map((step, index) =>
                            <li>
                                <input key={index} type="text" className="form-control" placeholder="Step" value={step} onChange={this.handleStep.bind(this, index)}/>
                            </li>
                        )}
                    </ol>
                </div>
                <button type="button" onClick={this.handleNewStep.bind(this)} className="btn btn-info">Add Step</button>
                <br/>
                <br/>
                <br/>

                <div className="flex-container">
                    <button className="btn btn-danger flex-element" data-toggle="modal" data-target="#DeleteModal">Delete</button>
                    <button type="button" onClick={this.handleCancel.bind(this)} className="btn btn-secondary flex-element">Cancel</button>
                    <button type="button" onClick={this.handleSave.bind(this)} className="btn btn-success flex-element">Save</button>
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
                            Are you sure you want to delete <strong>{store.getState().editingRecipe.recipe.name}</strong>?
                        </p>
                      </div>
                      <div className="modal-footer">
                        <div className="flex-container">
                            <button type="button" onClick={this.handleDelete.bind(this)} className="btn btn-danger flex-element" data-dismiss="modal">Delete</button>
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
