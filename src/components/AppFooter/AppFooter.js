import React from 'react'
import {Footer} from '../../styles/styles'

const AppFooter = ({showDetails, hoveredUser}) => (
    showDetails && hoveredUser.type && hoveredUser.type === "walker" ?
    <Footer>
        <p>{hoveredUser.name || hoveredUser.displayName || ""}</p>
        <p>{hoveredUser.about || ""}</p>
        <p>{hoveredUser.phone || ""}</p>
    </Footer>
    :
    null
)

export default AppFooter