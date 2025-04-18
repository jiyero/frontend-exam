import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

function DeleteUserModal({ isOpen, toggle, user, onConfirm }) {


    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader>Delete User</ModalHeader>
            <ModalBody className = "text-center">
                {user?.avatar && (
                    <img
                        src={user.avatar}
                        alt={`${user.first_name} ${user.last_name}`}
                        className = "rounded-circle m-3"
                        style={{width: '80px', height: '80px', objectFit: 'cover'}}
                    />
                )}

                <div>
                    Are you sure you want to delete {user?.first_name} {user?.last_name} ? 
                </div>
            </ModalBody>
            <ModalFooter>
            <Button color ="danger" onClick = {()=>{
                onConfirm(user.id);
                toggle();
            }}>Delete</Button>
            <Button type="button" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default DeleteUserModal;