import React from 'react';
import { useDispatch } from 'react-redux';
import { changeNumberOfSentences, pauseTimer } from '../redux/actions';
import $ from 'jquery';

export const InputModal = () => {

    const dispatch = useDispatch();

    function handleChange(event) {
        const inputted = event.target.value;
        if(!Number.isInteger(+inputted) || inputted === '0')
            $('.form-control').css('background-color', 'rgb(255, 90, 90)');
        else
            $('.form-control').css('background-color', 'white');
        if(inputted.length > 1)
            event.target.value = inputted.slice(0, 1);
    }

    function change() {
        const number = $('#number-value').val();
        if(!Number.isInteger(+number) || number === '0' || !number.length)
            return;
        dispatch(changeNumberOfSentences(number));
        finishModal();
    }

    function finishModal() {
        window.$('#input-modal').modal('hide');
        dispatch(pauseTimer(false));
    }

    return(
        <div>
            <div class="modal fade" id="input-modal" data-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog w-25">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Change number of sentences</h5>
                        </div>
                    <div class="modal-body">
                        <div class="mb-3 d-flex">
                            <label for="recipient-name" class="col-form-label">Number:</label>
                            <input
                                type="text"
                                class="form-control"
                                id="number-value"
                                style={{width: '35px'}}
                                onChange={handleChange}
                            />
                        </div>
                        <label style={{fontSize: '15px'}}>
                            The changes will take effect for the new text
                        </label>
                    </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={finishModal}>Close</button>
                            <button type="button" class="btn btn-primary" onClick={change}>Change</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
