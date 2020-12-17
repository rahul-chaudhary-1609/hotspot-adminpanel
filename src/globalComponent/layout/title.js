import React from 'react'

function Title({
    heading,
    paragraph, 
    className,
    ...props
}) {
    return (
        <>
            <div className={`app-page-title ${className}`}>
                    <div className="page-title-wrapper">
                        <div className="page-title-heading">
                            <div className="page-title-icon">
                                <i className="pe-7s-unlock text-success"></i>
                            </div>
                            <div>{heading}
                            <div className="page-title-subheading">
                            {paragraph}
                            </div>
                            </div>
                        </div>
                    </div>
            </div>
        </>        
    )
}

export default Title
