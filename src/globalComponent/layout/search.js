import React, {Fragment} from 'react';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder : " Search here",
        };
    }
    

    render() {

        return (
            <Fragment>
                    <>Search:{' '} 
                        <input type="text"  placeholder={this.state.placeholder} />
                    </>
            </Fragment>
        )
    }
}

const mapSatateToProps = (state) => {
    return {
        ...state
    }
}

export default SearchBox