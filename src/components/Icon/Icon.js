import React from "react";
import { Tooltip } from "../../styles/styles";
import { withStyles } from "@material-ui/core/styles";
import * as userTypes from "../../constants/UserTypes";

const tooltipText = item => {
  switch (item.type) {
    case userTypes.WALKER:
    case userTypes.SITTER:
      return (
        <div>
          <p>{item.name || item.displayName || ""}</p>
          <p>{(item.address && item.address.addressName) || ""}</p>
        </div>
      );
    case userTypes.DOG_OWNER:
      return <p>nice doggy</p>;
    case userTypes.CAT_OWNER:
      return <p>nice kitty</p>;
    default:
      return "";
  }
};

const iconSize = type => {
  if (window.screen.width > 980) {
    return {
      width: type === userTypes.DOG_OWNER ? "1.5vw" : "2vw",
      height: type === userTypes.DOG_OWNER ? "1.5vw" : "2vw"
    };
  } else {
    return {
      width: type === userTypes.DOG_OWNER ? "6vw" : "8vw",
      height: type === userTypes.DOG_OWNER ? "6vw" : "8vw"
    };
  }
};

const CustomTooltip = withStyles({
  tooltip: {
    fontSize: "14px"
  }
})(Tooltip);

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
);

export default IconLayer;
