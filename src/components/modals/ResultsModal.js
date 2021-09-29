import React from 'react';
import { useDispatch } from 'react-redux';
import { getText, repeatTheSameText } from '../../redux/actions';
import { blockBtnAndDispatchGetText, hideModal } from '../../functions';
import '../../styles/modals.css';

export function ResultsModal() {
    
    const dispatch = useDispatch();

    function repeatText() {
        dispatch(repeatTheSameText());
        annulZIndexOfIndicatorsAndCloseResults();
    }

    function getNewText() {
        blockBtnAndDispatchGetText(dispatch(getText()));
        annulZIndexOfIndicatorsAndCloseResults();
    }

    function annulZIndexOfIndicatorsAndCloseResults() {
        const indicators = document.querySelectorAll('.indicator');
        [].slice.call(indicators).map(el => el.style.zIndex = '0');
        hideModal('#results-modal');
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
                            <button type="button" className="btn btn-primary" onClick={repeatText}>Repeat the same text</button>
                            <button type="button" className="btn btn-primary" onClick={getNewText}>New text</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
