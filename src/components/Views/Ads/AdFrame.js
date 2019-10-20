import React, { Component } from 'react';
import Figure from 'react-bootstrap/Figure';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './Ads-styles.css';

class AdFrame extends Component{
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
            <div >
                <Container>
                    <Row>
                        <Col md="auto">    
                            <Figure>
                                <Figure.Image 
                                    onMouseOver={this.handleOnMouseOver}
                                    src={this.props.imgSrc}
                                    alt={this.props.productName}
                                    className = "ad-frame-figure"
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
                                <Button className="adProductButton" variant="outline-success">Destacar anuncio</Button>
                            </Row>
                            <Row>
                                <Button className="adProductButton" variant="outline-secondary">Marcar como vendido</Button>
                            
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

export default AdFrame;