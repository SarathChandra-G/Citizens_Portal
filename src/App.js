import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Button } from "@material-ui/core";
import { Dialog } from "@material-ui/core";

import Home from "./components/home";
import AboutUs from "./components/aboutus-bank";
import AllianceStory from "./components/aboutus-alliance";
import WhosWho from "./components/aboutus-whoswho";
import Presales from "./components/oppor-presales";
import MenuListComposition from "./components/menubar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_userId: sessionStorage.getItem("userId"),
      logged_userName: sessionStorage.getItem("userName"),
      dialog_visible: false,
      logged_out: false,
    };
    this.onClick = this.onClick.bind(this);
    this.onHide = this.onHide.bind(this);
  }

  onClick = () => {
    this.setState({ dialog_visible: true });
  };

  onHide = () => {
    this.setState({ dialog_visible: false });
  };

  logout = () => {
    this.setState({ dialog_visible: false });
    sessionStorage.clear();
    this.setState({ logged_out: true });
    window.location.reload();
  };

  confirm_logout = () => {
    this.setState({ dialog_visible: true });
  };

  render() {
    const logoutcard = (
      <div className="text-center font-weight-bold">
        <Button
          label="CONTINUE EXPLORING"
          icon="pi pi-check"
          onClick={this.onHide}
          className="p-button-success font-weight-bold"
        />
        <Button
          label="LOGOUT"
          icon="pi pi-times"
          onClick={this.logout}
          className="p-button-secondary font-weight-bold m-2"
        />
      </div>
    );
    return (
      <React.Fragment>
        <img
          style={{ marginLeft: 10, marginTop: 10, marginBottom: 10 }}
          src="./Assets/CTZ_Green-Logo.png"
          alt="Logo"
        />
        <Router>
          <div className="App content">
            <nav className="navbar navbar-expand-md navbar-dark">
              <ul className="navbar-nav">
                <MenuListComposition />
              </ul>
            </nav>
            <Dialog
              className="font-weight-bold"
              header="Confirm Logout"
              visible={this.state.dialog_visible}
              style={{ width: "50vw" }}
              logoutcard={logoutcard}
              onHide={this.onHide}
            >
              Do you really want to Logout ?
            </Dialog>
            <Switch>
              <Route path="/aboutus" component={AboutUs} />
              <Route path="/alliancestory" component={AllianceStory} />
              <Route path="/whoswho" component={WhosWho} />
              <Route path="/presales" component={Presales} />
              <Route exact path="/" component={Home} />
              <Route path="*" render={() => <Redirect to="/" />} />
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
