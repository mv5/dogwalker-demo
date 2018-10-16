import React from 'react'
import { Tooltip } from '../../styles/styles'
import { withStyles } from '@material-ui/core/styles';

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
  if(window.screen.width > 980){
    return {
      width: type === "walker" ? "2vw" : "1.5vw",
      height: type === "walker" ? "2vw" : "1.5vw"
    }
  }else{
    return {
      width: type === "walker" ? "8vw" : "6vw",
      height: type === "walker" ? "8vw" : "6vw"
    }
  }
}

const CustomTooltip = withStyles({
  tooltip: {
    fontSize: "14px"
  }
})(Tooltip)


const IconLayer = ({ item, icon, onHover, onHoverOut }) => (
  <CustomTooltip
    placement="top"
    title={tooltipText(item)}
    enterDelay={0}
    leaveDelay={200}
  >
    <div
      style={iconSize(item.type)}
      key={item}
      onMouseEnter={() => onHover(item)}
      onMouseLeave={() => onHoverOut()}
    >
      <img src={icon} style={{ width: "100%", height: "100%" }} alt="" />
    </div>
  </CustomTooltip>
)

export default IconLayer