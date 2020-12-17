import React from 'react'
import Loader from 'react-loaders'

function Loading() {
    return (
            <>  
                <div className="loader-block">
                    <div className="font-icon-wrapper float-left mr-3 mb-3">
                        <div
                            className="loader-wrapper d-flex justify-content-center align-items-center">
                            <Loader type="line-scale-pulse-out"/>
                        </div>
                    </div>
                </div>
            </>        
    )
}

export default Loading
