import React from 'react';
import { useDispatch } from 'react-redux';
import { changeNumberOfSentences, pauseTimer } from '../../redux/actions';
import { hideModal } from '../../functions';
import '../../styles/modals.css';

export function InputModal() {

    const dispatch = useDispatch();

    function changeHandler(e) {
        const i = e.target;

        if(i.value.length > 1)
            i.value = i.value.slice(0, 1);

        if(isNotNumberOrEmpty(i.value))
            i.style.backgroundColor = 'rgb(255, 90, 90)';
        else
            i.style.backgroundColor = 'white';
    }

    function isNotNumberOrEmpty(value) {
        return !Number.isInteger(+value) || value === '0';
    }

    function change() {
        const value = document.querySelector('#number-value').value;
        if(isNotNumberOrEmpty(value) || !value.length)
            return;
        dispatch(changeNumberOfSentences(value));
        closeModal();
    }

    function closeModal() {
        hideModal('#input-modal');
        dispatch(pauseTimer(false));
    }

    return(
        <div>
            <div className="modal fade" id="input-modal" data-backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog w-25">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Change number of sentences</h5>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3 d-flex">
                                <label htmlFor="number-value" className="input-label col-form-label">Number:</label>
                                <input type="text" className="input-input form-control" id="number-value" onChange={changeHandler} />
                            </div>
                            <span className="input-prompt">
                                The changes will take effect for the new text.
                            </span>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={change}>Change</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
