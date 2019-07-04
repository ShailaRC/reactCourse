import React, { Component } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody,
    Row, Col, Label
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class Comment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalCommentOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);

    }

    toggleModal() {
        this.setState({
            isModalCommentOpen: !this.state.isModalCommentOpen
        });
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submmit Comment</Button>
                <div className="col-12 col-md-9">
                    <Modal isOpen={this.state.isModalCommentOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Label htmlFor="rating" >Rating</Label>
                                <Row className="form-group">
                                    <Col md={10}>
                                        <Control.select model=".rating" name="rating"
                                            className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Label htmlFor="author">Author</Label>
                                <Row className="form-group">
                                    <Col md={10}>
                                        <Control.text model='.author' id='author' name='author'
                                            className="form-control" placeholder='Your name'
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}>
                                        </Control.text>
                                        <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                    </Col>
                                </Row>
                                <Label htmlFor="comment">Comment</Label>
                                <Row className="form-group">
                                    <Col md={10}>
                                        <Control.textarea model='.comment' id='comment' name='comment'
                                            className="form-control" rows="12" />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            </React.Fragment>
        );
    }
}

export default Comment;

