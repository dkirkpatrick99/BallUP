import { getAddress } from '../../actions/map_actions'
import { connect } from 'react-redux'
import Geocode from './geocoding'

const mSTP = state => ({
    location: '22 Main st Boston MA'
})

const mDTP = dispatch => ({
    getAddress: address => dispatch(getAddress(address))
})

export default connect(mSTP,mDTP)(Geocode)