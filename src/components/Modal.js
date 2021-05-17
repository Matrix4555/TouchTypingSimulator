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
            <div class="modal fade" id="modal-result" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Congratulations!</h5>
                    </div>
                    <div class="modal-body">Your results from below &#8595;</div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => getNewText(true)}>Repeat the same text</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => getNewText() }>New text</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
