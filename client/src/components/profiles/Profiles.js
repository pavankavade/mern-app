import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profileActions';

import SearchBox from "./SearchBox"
class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }
  onChange({ target: { search } }) {

    // Set captured value to input
    this.setState({ search: search });
  }
  componentDidMount() {
    this.props.getProfiles();
  }
  handleInput = (e) => {
    this.setState({ search: e.target.value })
  }

  render() {
    //const { search } = this.state;
    const { profiles, loading } = this.props.profile;
    let profileItems;
    let searchItem = (this.state.search).toLowerCase();
    //(!profile.isWorker ? null : <ProfileItem key={profile._id} profile={profile} />)
    //((profile.user.name.localeCompare(this.state.search)) ? null : <ProfileItem key={profile._id} profile={profile} />)
    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => {
          if (!(profile.user.name).toLowerCase().indexOf(searchItem)) {
            return (!profile.isWorker ? null : <ProfileItem key={profile._id} profile={profile} />)
          }
        }
        );
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles" >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Worker Profiles</h1>

              <div className="card card-body mb-4 p-4">
                <h2 className="display-4 text-center">
                  Search for a Worker
                    </h2>

                <SearchBox handleInput={this.handleInput} />
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
