import { getAddress } from '../../actions/map_actions'
import { connect } from 'react-redux'
import Geocode from './geocoding'

const mSTP = state => ({
    location: '768 Widgeon st Foster City CA'
})

const mDTP = dispatch => ({
    getAddress: address => dispatch(getAddress(address))
})

export default connect(mSTP,mDTP)(Geocode)