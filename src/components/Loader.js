import React from 'react';

export const Loader = ({certainId}) => {
    return(
        <div class="spinner-border text-danger" id={certainId} role="status">
            <span class="sr-only"></span>
        </div>
    );
}
