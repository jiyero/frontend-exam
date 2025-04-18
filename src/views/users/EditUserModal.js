import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
  } from 'reactstrap';

function EditUserModal({ isOpen, toggle, user, onSubmit }) {

    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                email: user.email || '',
                first_name: user.first_name || '',
                last_name: user.last_name || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...user, ...formData }); //only overwrite email, first_name, last_name
        toggle();
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Edit User</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                    <Label for="first_name">First Name</Label>
                        <Input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for ="last_name">Last Name</Label>
                        <Input
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>

                    <ModalFooter>
                        <Button color="warning" type="submit">Save</Button>
                        <Button type="button" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </ModalBody>

        </Modal>
    )

}


export default EditUserModal;