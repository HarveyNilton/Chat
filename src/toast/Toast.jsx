import React from 'react';
import './toast.css'

const Toast = (props) => {
    return (
        <div className={`toast ${props.type}`}>
            {props.message}
        </div>
    );
};

export default Toast;