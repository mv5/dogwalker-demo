import React from 'react'

const IconLayer = ({item, icon}) => (
        <div
          style={{ width: "1vw", height: "1vw" }}
          onClick={() => console.log("click")}
          key={item}
        >
          <img src={icon} style={{ width: "100%", height: "100%" }} alt=""/>
        </div>
    )

export default IconLayer