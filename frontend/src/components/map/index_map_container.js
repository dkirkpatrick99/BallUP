import IndexMap from './index_map'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
   
   return {
     games: state.games.all
    }
}


export default connect(mapStateToProps, null)(IndexMap)