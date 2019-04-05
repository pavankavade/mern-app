import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profileActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';

class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      check: ''
    };
    this.onChange = this.onChange.bind(this);

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });

  }
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    //const { search } = this.state;
    const { profiles, loading } = this.props.profile;
    let profileItems;
    let searchItem = (this.state.search).toLowerCase();
    const { check } = this.state.check;
    console.log(this.state.check);

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => {

          if ((profile.skills).toLowerCase().includes(searchItem)) {
            return (!profile.isWorker ? null : <ProfileItem key={profile._id} profile={profile} />)
          }
        }
        );
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    const options = [
      { label: 'Name', value: 'name' },
      { label: 'Location', value: 'location' },
      { label: 'skills', value: 'skills' },
    ];

    /*<SelectListGroup
                 placeholder="search by"
                 name="check"
                 value={this.state.check}
                 onChange={this.onChange}
                 options={options}
                 info="Search by"
               />
               {this.state.check} */

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

                <TextAreaFieldGroup
                  placeholder="Search for profiles"
                  name="search"
                  value={this.state.search}
                  onChange={this.onChange}
                />


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
