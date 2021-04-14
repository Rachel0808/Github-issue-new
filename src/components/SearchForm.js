import React from "react";
import { Button, Col, Form } from "react-bootstrap";

const SearchForm = ({ loading }) => {
  return (
    <Form>
      <Form.Row>
        <Col xs={7}>
          <Form.Control placeholder="Search.." />
        </Col>
        <Col>
          {loading ? (
            <Button disabled>
              <span
                classname="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Searching...
            </Button>
          ) : (
            <Button type="submit">Search</Button>
          )}
        </Col>
      </Form.Row>
    </Form>
  );
};

export default SearchForm;
