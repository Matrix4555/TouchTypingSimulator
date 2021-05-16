import React from 'react';

export const DangerModal = () => {
    return(

        <div class="modal fade" id="danger-modal" data-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="staticBackdropLabel">Error</h5>
                    </div>
                <div class="modal-body">Failed to connect to the server.</div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-danger text-white"
                        onClick={() => window.location.reload()}    
                    >Reload the page</button>
                </div>
                </div>
            </div>
        </div>
    );
}
