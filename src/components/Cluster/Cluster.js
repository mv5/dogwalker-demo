import React from 'react'
import { Avatar } from '../../styles/styles'

const Cluster = ({children}) => (
    <Avatar
       style={{
           backgroundColor: "#28536B"
       }}
    >
        {children}
    </Avatar>
)

export default Cluster