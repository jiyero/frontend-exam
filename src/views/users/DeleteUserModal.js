import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function DeleteUserModal({ isOpen, toggle, user, onConfirm }) {


    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader>Delete User</ModalHeader>
            <ModalBody>
                {user?.avatar && (
                    <img
                        src={user.avatar}
                        alt={`${user.first_name} ${user.last_name}`}
                    />
                )}

                <div>
                    Are you sure you want to delete {user?.first_name} {user?.last_name} ? 
                </div>
            </ModalBody>
            <ModalFooter>
            <button onClick = {()=>{
                onConfirm(user.id);
                toggle();
            }}>Delete</button>
            <button type="button" onClick={toggle}>Cancel</button>
            </ModalFooter>
        </Modal>
    )
}

export default DeleteUserModal;