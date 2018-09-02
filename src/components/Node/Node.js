import React from 'react';

const node = (props) => (
    <div>
        <h4>{props.id}</h4>
        <h4>{props.fullName}</h4>
        <image href={props.picture}></image>
        </div>
)

export default node;