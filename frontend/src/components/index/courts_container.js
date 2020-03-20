import React from 'react';
import Courts from './courts';
import { connect } from 'react-redux';


const mapStateToProps = (state) => ({
    courts: Object.values.courts,
})


const mapDispatchToProps = (dispatch) => ({
    // getGames: 
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Courts);