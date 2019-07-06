import React, { Component }  from 'react';
import {
  Card, CardImg, CardText,
  CardTitle, CardBody, Breadcrumb, BreadcrumbItem ,
  Button, Modal, ModalHeader, ModalBody, Row, Col, Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card key={dish.id}>
          <CardImg  top src={baseUrl + dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return (<div></div>);
  }
}

function RenderComments({ comments, postComment, dishId }) {
  if (comments != null) {
    const listComments = comments.map((comment) => {
      return (

        <ul key={comment.id} className="list-unstyled">
          <li>{comment.comment}</li>
          <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</li>
        </ul>

      );
    });
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        {listComments}
        <CommentForm  dishId={dishId} postComment={postComment}/>
      </div>
    );
  } else {
    return (
      <div></div>
    );
  }
}



class CommentForm extends Component {

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
    this.toggleModal(); 
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment); //from video, not from excercise
      // console.log('Current State is: ' + JSON.stringify(values));
      // alert('Current State is: ' + JSON.stringify(values));
      // event.preventDefault();
  }

  render() {
      return (
          <React.Fragment>
              <Button outline onClick={this.toggleModal}><span className="fa fa-lg fa-pencil"></span> Submmit Comment</Button>
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

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }
  else if (props.dish != null) {

    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
        </div>
      </div>
    );
  }else{ return (<div></div>); }
}



export default DishDetail;
