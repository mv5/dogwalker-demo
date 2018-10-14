import React from 'react'
import { css } from 'react-emotion';
import { RingLoader } from 'react-spinners';

const override = css`
    margin-top: 20vh;
    margin-left: 50vw;
    transform: translateX(-50%);
`;

const Loader = () => (
    <RingLoader
        className={override}
        color={"#2196f3"}
    />
)

export default Loader