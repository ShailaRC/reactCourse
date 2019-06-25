import React, {Component} from 'react';
import {
    Card, CardImg, CardText, 
    CardTitle
  } from 'reactstrap';


class DishDetail extends Component{

  constructor(props){
    super(props);
  }

  renderDish(dish){
    if(dish != null){
      return(
        <Card key={dish.id}>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </Card>
      );
    }else{
      return(<div></div>);
    }
    console.log(dish);
  }
  
  renderComments(dish){
    if(dish != null){
      console.log(dish);
      const listComments = dish.comments.map((comment) => {
        return(
          <div key={comment.id}>
            <ul  className = "list-unstyled">
              <li>{comment.comment}</li>
              <li>-- {comment.author}, {new Date(comment.date).toLocaleDateString()}</li>
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
   console.log(details);
    return (
      <div  className="row">
        <div className="col-12 col-md-5 m-1">
          {this.renderDish(this.props.selectedDish)}
    
        </div>
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          {this.renderComments(this.props.selectedDish)}
        </div>
      </div> 
    );
  }
}

export default DishDetail;