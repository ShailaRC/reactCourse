import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
  } from 'reactstrap';


class DishDetail extends Component{
  
  renderComments(comments){
    if(comments != null){
      console.log(comments);
      const listComments = comments.map((comment) => {
        return(
          <div key={comment.id}>
            <ul  className = "list-unstyled">
              <li>
                {comment.comment}
              </li>
              <li>
                {comment.date}
              </li>
            </ul>
          </div>
        );
      });
      return(listComments);    
    }else{
      return(
      <div></div>
      );
    }
  }

  render() {

    const details = this.props.details;
   
    return (
      <div  className="row">
        <div className="col-12 col-md-5 m-1">
          <Card key={details.id}>
            <CardImg width="100%" src={details.image} alt={details.name} />
            <CardTitle>{details.name}</CardTitle>
            <CardText>{details.description}</CardText>
          </Card>
        </div>
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          {this.renderComments(this.props.details.comments)}
        </div>
      </div> 
    );
  }
}

export default DishDetail;