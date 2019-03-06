import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profileActions';

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;


    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          (!profile.isWorker ? null : <ProfileItem key={profile._id} profile={profile} />)
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      } <ProfileItem key={profile._id} profile={profile} />
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Worker Profiles</h1>
              <p className="lead text-center">
                Browse and connect with Workers
              </p>
              <div className="card card-body mb-4 p-4">
                <h2 className="display-4 text-center">
                  Search for a Worker
                    </h2>

                <form >
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Search.."
                      name="trackTitle"

                    />
                  </div>
                  <button className="btn btn-primary btn-lg btn-block mb-5"
                    type="submit">Get Worker Profiles</button>
                </form>
              </div>
              {profileItems}
            </div>
          </div>
        </div>
      </div >
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
