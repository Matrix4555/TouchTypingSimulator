import React from 'react';

export function DangerModal() {
    return(
        <div className="modal fade" id="danger-modal" data-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-danger text-white">
                        <h5 className="modal-title" id="staticBackdropLabel">Error</h5>
                    </div>
                    <div className="modal-body">Failed to connect to the server.</div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-danger text-white"
                            onClick={() => window.location.reload()}    
                        >Reload the page</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
