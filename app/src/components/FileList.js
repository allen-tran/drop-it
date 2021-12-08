import React, { Component } from "react";
import { Container, ListGroup } from "reactstrap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { getUserFiles } from "../functions/RDSFunctions";
import { getAuthInfo, isAdmin } from "../functions/AuthFunctions";
import File from "./File";
import NewModal from "./NewModal.js";

class FileList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalShown: false,
      itemToEdit: null,
      items: [],
      adminStatus: false
    };
  }

  componentDidMount() {
    this.renderObjects();
  }

  renderObjects = async () => {
    let returnedId = await getAuthInfo();
    let adminStatus = await isAdmin();
    let userFiles = await getUserFiles(returnedId);
    this.setState({
      adminStatus: adminStatus,
      items: userFiles
    });
  }

  /**
   * This function opens the edit modal with the item to edit
   * @param item an item object
   */
  toggleShowEditModal = (item) => {
    this.setState({
      itemToEdit: item,
      modalShown: true
    });
  };

  /**
   * Render the class component
   */
  render() {
    return (
      <Container>
        <NewModal showEditModal={this.state.modalShown} item={this.state.itemToEdit} />
        <ListGroup>
          <TransitionGroup>
            {this.state.items.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <CSSTransition timeout={500} classNames="fade">
                    <File
                      item={item}
                      isAdmin={this.state.adminStatus}
                      toggleShowEditModal={this.toggleShowEditModal}
                    />
                  </CSSTransition>
                </React.Fragment>
              );
            })}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

export default FileList;