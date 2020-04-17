import IndexMap from './index_map'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    games: state.games.all
})


export default connect(mapStateToProps, null)(IndexMap)