import React from 'react';
import { GoogleLogin } from './App.js';
import { store } from '../index.js';

export class NavBar extends React.Component {

    download(){
        var data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(store.getState().recipes));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", data);
        downloadAnchorNode.setAttribute("download", "recipes.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    render() {
      return (
          <div>
              {/*bootstrap navbar*/}
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container">
                  <a className="navbar-brand" href="http://DanTheManGude.github.io/Gude-Foods">Gude Foods</a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <a className="nav-link" onClick={this.download.bind(this)}><i className="fa fa-code" aria-hidden="true"></i> Download</a>
                      </li>
                      {/*Github repo where this project can be found*/}
                      <li className="nav-item">
                        <a className="nav-link" href="https://github.com/DanTheManGude/Gude-Foods" target="_blank"><i className="fa fa-code" aria-hidden="true"></i> Source</a>
                      </li>
                      {/*mail to link to get in contact with me*/}
                      <li className="nav-item">
                          <a className="nav-link" href="mailto:contact@dangude.com?Subject=Gude-Foods%20Contact"><i className="fa fa-envelope" aria-hidden="true"></i> Contact</a>
                      </li>
                      {/*my main homepage*/}
                      <li className="nav-item">
                        <a className="nav-link" href="https://dangude.com" target="_blank"><img src="icons/DG.png" alt="DG" height='25'/> </a>
                      </li>
                      {/*GoogleLogin*/}
                      <li className="nav-item">
                          <a className="nav-link" id='Login' onClick={GoogleLogin}><img src="icons/G.png" alt="Google Login" height='25em'/> Login</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
          </div>
      );
    }
}
