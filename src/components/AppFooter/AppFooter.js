import React from "react";
import { Footer, Typography } from "../../styles/styles";
import * as userTypes from "../../constants/UserTypes";

const AppFooter = ({ showDetails, hoveredUser }) => (
  <Footer>
    {showDetails &&
    (hoveredUser.type === userTypes.WALKER ||
      hoveredUser.type === userTypes.SITTER) ? (
      <div>
        <Typography variant="subtitle1" color="primary">
          {hoveredUser.name || hoveredUser.displayName || ""}
        </Typography>
        <Typography variant="subtitle1" color="primary">
          {hoveredUser.about || ""}
        </Typography>
        <Typography variant="subtitle2" color="primary">
          {hoveredUser.phone || ""}
        </Typography>
      </div>
    ) : (
      <Typography variant="subtitle1" color="secondary">
        *Hover over a Walker or a Sitter to see his/her details
      </Typography>
    )}
  </Footer>
);

export default AppFooter;
