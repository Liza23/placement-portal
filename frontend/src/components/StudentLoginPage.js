import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

function StudentLoginPage() {
  const [rollNo, setrollNo] = useState(false);
  const [password, setpassword] = useState(false);
  const [isLoading, setLoading] = useState(true);

  let handleSubmit = async (e) => {
    e.preventDefault();
    // axios({
    //   url: "http://localhost:5000/venues/add",
    //   method: "POST",
    //   data: {
    //     venue: venue,
    //     country: country,
    //     city: city,
    //     capacity: capacity,
    //   },
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then(function (response) {
    //     console.log(response);
    //     window.location.reload(false);
    //   })
    //   .catch(function (response) {
    //     //handle error
    //   });
  };

  return (
    <div>
      <Container style={{paddingTop: '5em'}}>
        <Row>
          <h1>Login</h1>
        </Row>
        <br></br>
        <Row>
          <h6 style={{textAlign: 'center'}}>If you have an account, login in here!</h6>
        </Row>
        <br></br>
        <Row>
          <Col></Col>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2" controlId="roll_no">
                <Form.Label>Roll No.</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Roll No:"
                  onChange={(e) => setrollNo(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="CityName">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default StudentLoginPage;
