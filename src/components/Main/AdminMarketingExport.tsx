import React, {useContext} from 'react';
import axios from '../../auxiliary/axios';
import {ModalContext} from '../../providers/ModalProvider';

function AdminMarketingExport() {
    const modal = useContext(ModalContext);
    return (
        <div className="AdminMarketingExport">
            <div className="padding-top-bottom-20 padding-left-right-15" style={{
                minHeight: '120px'
            }}>
                <p>
                    An email will be sent to<span style={{fontStyle: 'italic'}}> sales@admindesk.club </span>
                    containing attachments for both club owner and player registrations in CSV format.
                    Would you like to continue?
                </p>
                <div className="button--container text-align-center margin-top-20">
                    <button className="confirmation--button" onClick={async () => {
                        await axios.post('/v1/marketing/send-marketing-csv');
                        modal.hideModal();
                        setTimeout(() => {
                            modal.setModalData({
                                header: 'Success',
                                content: (
                                    <div className="padding-top-bottom-20 padding-left-right-15" style={{
                                        minHeight: '120px'
                                    }}>
                                        <p>The email has been sent successfully! Please check the inbox folder to access the files.</p>
                                        <div className="button--container text-align-center margin-top-20">
                                            <button className="confirmation--button" onClick={() => {
                                                modal.hideModal();
                                            }}>Ok</button>
                                        </div>
                                    </div>
                                )
                            })
                        }, 300)
                        setTimeout(() => {
                            modal.showModal();
                        }, 500)
                    }}>Ok</button>
                </div>
            </div>
        </div>
    )
}

export default AdminMarketingExport;