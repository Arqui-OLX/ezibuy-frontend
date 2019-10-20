import React, { Component } from 'react';
import Figure from 'react-bootstrap/Figure';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './Favorites.css';

class FavoriteFrame extends Component{
    constructor(props){
        super(props);
        this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
    }


    handleOnMouseOver(e){
        //e.preventDefault();
        console.log('Mouse over!');
    }

    render(){
        return(
            <div className="favorite-frame">
                <Container>
                    <Row>
                        <Col md="auto">    
                            <Figure>
                                <Figure.Image 
                                    onMouseOver={this.handleOnMouseOver}
                                    src={this.props.imgSrc}
                                    alt={this.props.productName}
                                    className = "favorite-frame-figure"
                                    rounded
                                    fluid
                                />
                            </Figure>
                        </Col>
                        <Col md="auto">
                            <Row>
                                <h3>{this.props.productName}</h3>
                            </Row>
                            <Row>
                                <p>{this.props.productLocation}</p>
                            </Row>
                            <Row>
                                <Button className="favoriteProductButton" variant="outline-success">Contacta con el vendedor</Button>
                            </Row>
                            <Row>
                                <Button className="favoriteProductButton" variant="outline-danger">Eliminar de favoritos</Button>
                            
                            </Row>
                        </Col>
                        <Col md="auto">
                            <h3>$ {this.props.productPrice}</h3>
                        </Col>
                    </Row>
                </Container>
                <hr></hr>

            </div>
        )
        
    }

}

export default FavoriteFrame;