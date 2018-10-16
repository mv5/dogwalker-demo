import React from 'react'
import { Footer, Typography } from '../../styles/styles'

const AppFooter = ({ showDetails, hoveredUser }) => (
    <Footer>
        {showDetails && hoveredUser.type && hoveredUser.type === "walker" ?
            <div>
                <Typography variant="subtitle1" color="primary">{hoveredUser.name || hoveredUser.displayName || ""}</Typography>
                <Typography variant="subtitle1" color="primary">{hoveredUser.about || ""}</Typography>
                <Typography variant="subtitle2" color="primary">{hoveredUser.phone || ""}</Typography>
            </div>
            :
            <Typography variant="subtitle1" color="secondary">*Hover over a Walker to see his/her details</Typography>
        }
    </Footer>
)

export default AppFooter