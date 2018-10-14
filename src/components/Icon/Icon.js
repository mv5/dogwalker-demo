import React from 'react'
import { Tooltip } from '../../styles/styles'

const tooltipText = item => (
  item.type === "walker" ?
  <div>
    <p>{item.name || item.displayName || ""}</p>
    <p>{(item.address && item.address.addressName) || ""}</p>
  </div>
  :
  <p>nice doggy</p>
)

const iconSize = type => {
  return {
    width: type === "walker" ? "2vw" : "1.5vw",
    height: type === "walker" ? "2vw" : "1.5vw"
  }
}

const IconLayer = ({ item, icon, onHover }) => (
  <Tooltip
    placement="top"
    title={tooltipText(item)}
    enterDelay={0}
    leaveDelay={200}
  >
    <div
      style={iconSize(item.type)}
      key={item}
      onMouseEnter={() => onHover(item)}
      onMouseLeave={() => onHover()}
    >
      <img src={icon} style={{ width: "100%", height: "100%" }} alt="" />
    </div>
  </Tooltip>
)

export default IconLayer