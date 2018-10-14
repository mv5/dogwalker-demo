import React from 'react'
import { Footer, Typography } from '../../styles/styles'

const AppFooter = ({ showDetails, hoveredUser }) => (
    <Footer>
        {showDetails && hoveredUser.type && hoveredUser.type === "walker" ?
            <div>
                <Typography variant="subheading" color="secondary">{hoveredUser.name || hoveredUser.displayName || ""}</Typography>
                <Typography variant="subtitle1" color="secondary">{hoveredUser.about || ""}</Typography>
                <Typography variant="subtitle2" color="secondary">{hoveredUser.phone || ""}</Typography>
            </div>
            :
            <Typography variant="subheading" color="secondary">*Hover over a Walker to see his/her deails</Typography>
        }
    </Footer>
)

export default AppFooter