import React from 'react';
import Conditions from './Conditions';
import Contents from './Contents';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { weatherReport: "" };
    this.handleChangeCityCondition = this.handleChangeCityCondition.bind(this);
  }

  handleChangeCityCondition(e) {
    var cityId = e.target.value

    fetch(`http://weather.livedoor.com/forecast/webservice/json/v1?city=${cityId}`,
      { mode: 'no-cors' }
    ).then(
      (response) => response.json()
    ).then(
      (json) => this.setState({ weatherReport: json })
    );

    this.render();
  }

  render() {
    return (
      <div id="a-page" >
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {' Weather Report Viewer '}
          </Navbar.Brand>
        </Navbar>
        <Container fluid={true}>
          <Row>
            <Col lg={2} md={3}>
              <Conditions onChange={this.handleChangeCityCondition} />
            </Col>

            <Col lg={10} md={9}>
              <Contents cityId={this.state.weatherReport} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
