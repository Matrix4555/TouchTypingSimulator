import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getText } from '../../redux/actions';
import { toggleModal } from '../../functions';
import '../../styles/modals.css';

export function ResultsModal() {

    const dispatch = useDispatch();
    const number = useSelector(state => state.text.numberOfSentences);

    function getNewText(same = false) {

        const btn = document.querySelector('.control-btn');
        btn.setAttribute('disabled', '');
        dispatch(getText(same ? -1 : number))
            .then(() => btn.removeAttribute('disabled'))
            .catch(() => toggleModal('#danger-modal', true));

        const indicators = document.querySelectorAll('.indicator');
        [].slice.call(indicators).map(el => el.style.zIndex = '0');
        toggleModal('#results-modal', false);
    }

    return(
        <div>
            <div className="modal fade" id="results-modal" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Congratulations!</h5>
                        </div>
                        <div className="modal-body">Your results from below &#8595;</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => getNewText(true)}>Repeat the same text</button>
                            <button type="button" className="btn btn-primary" onClick={() => getNewText() }>New text</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
