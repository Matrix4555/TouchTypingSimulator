import React from 'react';
import { useDispatch } from 'react-redux';
import { changeNumberOfSentences, pauseTimer } from '../../redux/actions';
import '../../styles/input-modal.css';

export function InputModal() {

    const dispatch = useDispatch();

    function handleChange(event) {
        const inputted = event.target.value;
        if(!Number.isInteger(+inputted) || inputted === '0')
            document.querySelector('.form-control').style.backgroundColor = 'rgb(255, 90, 90)';
        else
            document.querySelector('.form-control').style.backgroundColor = 'white';
        if(inputted.length > 1)
            event.target.value = inputted.slice(0, 1);
    }

    function change() {
        const number = document.querySelector('#number-value').value;
        if(!Number.isInteger(+number) || number === '0' || !number.length)
            return;
        dispatch(changeNumberOfSentences(number));
        closeModal();
    }

    function closeModal() {
        window.$('#input-modal').modal('hide');
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
                                <input type="text" className="input-input form-control" id="number-value" onChange={handleChange} />
                            </div>
                            <span className="input-prompt">
                                The changes will take effect for the new text.
                            </span>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={change}>Change</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
