import React from 'react';
import { Loader } from '../minor/Loader';
import PropTypes from 'prop-types';

export function Text({text}) {    
    return(
        <>
            {
                text ?
                    <p className="align-self-center">
                        {text.split('').map((letter, index) => <span className='character' key={index}>{letter}</span>)}
                    </p> :
                    <Loader classTitle={'text-spinner'}/>
            }
        </>
    );
}

Text.propTypes = {
    text: PropTypes.string
};
