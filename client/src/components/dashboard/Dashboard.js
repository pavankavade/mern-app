import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "./../common/Spinner";
import { Link } from "react-router-dom";
//import Books from "./Books";
import ProfileActions from "./ProfileActions";
import { deleteAccount } from "../../actions/profileActions";
import Experience from "./Experience";
import Education from "./Education";
class Dashboard extends Component {

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    let edit;
    let exp, edu;
    if (profile !== null) {
      exp = (
        (!profile.isWorker ? null :
          <Experience experience={profile.experience} />
        )
      );
    }
    if (profile !== null) {
      edu = (
        (!profile.isWorker ? null :
          <Education education={profile.education} />
        )
      );
    }


    if (profile !== null) {
      edit = (
        (!profile.isWorker ? <Link to="/edit-company-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" /> Edit Company Profile
        </Link> : <ProfileActions />

        )
      )
    }

    if (profile === null || loading) {
      dashboardContent = (
        <h4>
          <Spinner />
        </h4>
      );
    } else {
      //Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (

          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
              {user.hello}
            </p>
            <div className="btn-group mb-4" role="group">

              {edit}
            </div>
            {exp}
            {edu}
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete Account
            </button>
          </div>
        );
      } else {
        //User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome {user.name}
              {user.hello}
            </p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link><Link to="/create-company-profile" className="btn btn-lg btn-info">
              Create Company Profile
            </Link>
          </div>
        );
      }
    }




    return (
      <div className="dashboard" >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>

              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,

  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
