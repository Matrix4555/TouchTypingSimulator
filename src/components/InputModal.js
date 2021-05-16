import React from 'react';
import { useDispatch } from 'react-redux';
import { changeNumberOfSentences } from '../redux/actions';
import $ from 'jquery';

export const InputModal = () => {

    const dispatch = useDispatch();

    function handleChange(event) {
        const inputted = event.target.value;
        if(!Number.isInteger(+inputted))
            $('.form-control').css('background-color', 'rgb(255, 90, 90)');
        else
            $('.form-control').css('background-color', 'white');
        if(inputted.length > 1)
            event.target.value = inputted.slice(0, 1);
    }

    function change(event) {

        // clicking of enter reloads the page

        const number = $('#number-value').val();
        if(!Number.isInteger(+number) || !number.length)
            return;
        dispatch(changeNumberOfSentences(number));
        window.$('#exampleModal').modal('hide');
    }

    return(
        <div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog w-25">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Change number of sentences</h5>
                        </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3 d-flex">
                                <label for="recipient-name" class="col-form-label">Number:</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="number-value"
                                    style={{width: '35px'}}
                                    onChange={handleChange}/>
                            </div>
                        </form>
                    </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {
                                window.$('#exampleModal').modal('hide');
                            }}>Close</button>
                            <button type="button" class="btn btn-primary" onClick={change}>Change</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
