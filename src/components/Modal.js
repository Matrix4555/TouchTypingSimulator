import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getText } from '../redux/actions';
import $ from 'jquery';

export const Modal = () => {

    const dispatch = useDispatch();
    const number = useSelector(state => state.text.numberOfSentences);

    function getNewText(same = false) {
        dispatch(getText(same ? -1 : number));
        $('.indicator').css('z-index', '0');
    }

    return(
        <div>
            <div className="modal fade" id="modal-result" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Congratulations!</h5>
                    </div>
                    <div className="modal-body">Your results from below &#8595;</div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => getNewText(true)}>Repeat the same text</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => getNewText() }>New text</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
