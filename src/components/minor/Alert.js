import React from 'react';
import '../../styles/alert.css';

export function Alert() {
    return(
        <div className="alert alert-warning bg-warning">
            You are using the wrong keyboard layout. Please change this.
        </div>
    );
}
