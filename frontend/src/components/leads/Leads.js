import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLeads} from '../../actions/leads';
import Lead from './Lead';

export class Leads extends Component {
    static propTypes = {
        leads: PropTypes.array.isRequired,
        getLeads: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getLeads();
    };

    render() {
        return this.props.leads.map((lead)=>(
                 <Lead key={lead.id} lead ={lead} />     
        ));
    }


}

const mapStateToProps = state => ({
    leads: state.leads.leads
});


export default connect(mapStateToProps, { getLeads })(Leads);