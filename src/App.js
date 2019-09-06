import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import "./App.scss";
import { Loader } from "semantic-ui-react";

import PrivateRoute from "./components/PrivateRoute";

import { initGA, logPageView } from "./components/analytics/Analytics";

import { useAuth0 } from "./components/auth/react-auth0-wrapper";

import Landing from "./components/Landing";
import Profile from "./components/profile/Profile";
import NavBar from "./components/nav/NavBar";
import GroupContainer from "./components/groups/GroupContainer";
import MakeProfile from "./components/profile/MakeProfile";
import GroupPage from "./components/group-page/GroupPage";
import CreateGroup from "./components/groups/CreateGroup";
import UnderConstruction from "./components/UnderConstruction";

import { LOGIN } from "./reducers/userReducer";

function App(props) {
	const dispatch = useDispatch();
	const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
	const { loading, user, isAuthenticated } = useAuth0();

	useEffect(() => {
		if (!window.GA_INITIALIZED) {
			initGA();
			window.GA_INITIALIZED = true;
		}
		logPageView();
	}, []);

	useEffect(() => {
		const pushTo =
			window.location.pathname !== "/" ? window.location.pathname : "/profile";
		if (isAuthenticated && !loggedInUser && user) {
			const registerUser = async () => {
				const result = await axios.post(process.env.REACT_APP_AUTHURL, {
					email: user.email
				});
				console.log(result);
				dispatch({
					type: LOGIN,
					payload: result.data
				});
				if (result.data.newUser) {
					props.history.push("/makeprofile");
				}
				if (result.data.currentUser) {
					props.history.push(`${pushTo}`);
				}
			};
			registerUser();
		}
	});

	if (loading) {
		return (
			<Loader active size="large">
				Loading
			</Loader>
		);
	}

	return (
		<div className="App">
			<Switch>
				<Route exact path="/" component={!isAuthenticated ? Landing : NavBar} />
				<NavBar />
			</Switch>
			<Switch>
				<Route exact path="/" component={UnderConstruction} />
				<PrivateRoute exact path="/makeprofile" component={MakeProfile} />
				<PrivateRoute exact path="/creategroup" component={CreateGroup} />
				<PrivateRoute exact path="/editgroup" component={CreateGroup} />
				<PrivateRoute
					exact
					path="/notifications"
					component={UnderConstruction}
				/>
				<PrivateRoute exact path="/groups" component={GroupContainer} />
				<PrivateRoute exact path="/profile" component={Profile} />
				<PrivateRoute exact path="/group/:id" component={GroupPage} />
			</Switch>
		</div>
	);
}

export default withRouter(App);
