import React from "react";
import { ListGroupItem, Row, Col, Button } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import { getDownloadUrl } from "../functions/S3Functions";
// import { isAdmin } from "../backend/AuthFunctions";

export function File(props) {
  function toggleShowEditModal(item) {
    props.toggleShowEditModal(item);
  };

  async function downloadFile() {
    let url = await getDownloadUrl(props.item.file_id);
    window.open(url);
  }

  /**
   * Render the class component
   */
  function renderUserName(firstName, lastName) {
    if (props.isAdmin) {
      return (
        <Row>
          <Col>
            <h4>
              Uploaded by:
            </h4>
          </Col>
          <Col>
            <h5>last name: {lastName}</h5>
          </Col>
          <Col>
            <h5>first name: {firstName}</h5>
          </Col>
        </Row>
      );
    } else {
      return <React.Fragment />;
    }
  }

  return (
    <CSSTransition timeout={500} classNames="fade">
      <React.Fragment>
        <ListGroupItem id={`itemtype-${props.item.key}`}>
          <div style={{ display: "inline-block", width: "90%" }}>
            <Row>
              <div style={{ float: "left" }}>
                <Row>
                  <h3>{props.item.title}</h3>
                </Row>
                {renderUserName(props.item.first_name, props.item.last_name)}
                <Row style={{border: ".5px solid gray"}}>
                  <Col>
                    <p>Size: {props.item.size} bytes</p>
                  </Col>
                  <Col>
                    <p>Last Modified: {props.item.updated_time}</p>
                  </Col>
                  <Col>
                    <p>Uploaded: {props.item.uploaded_time}</p>
                  </Col>
                </Row>
                <Row>
                  {props.item.description ? <p style={{ fontStyle: "italic" }}>
                    {props.item.description} </p> : ""}
                </Row>
              </div>
            </Row>
            <Row style={{float: "right"}}>
              <Button className={"btn btn-warning float-right"}
                onClick={async () => await downloadFile()}>
                Download
              </Button>
              <Button className={"btn btn-info float-right"}
                onClick={() => toggleShowEditModal(props.item)}>
                Info
              </Button>
            </Row>
          </div>
        </ListGroupItem>

      </React.Fragment>
    </CSSTransition>
  );
}

export default File;