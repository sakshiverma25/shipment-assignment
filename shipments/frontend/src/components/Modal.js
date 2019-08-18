import React, { Component } from "react";
    import {
      Button,
      Modal,
      ModalHeader,
      ModalBody,
      ModalFooter,
      Form,
      FormGroup,
      Input,
      Label
    } from "reactstrap";


    export default class CustomModal extends Component {
      constructor(props) {
        super(props);
        this.state = {
          activeItem: this.props.activeItem
        };
      }
      handleChange = e => {
        let { name, value } = e.target;
        if (e.target.type === "checkbox") {
          value = e.target.checked;
        }
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
      };
      render() {
        const { toggle, onSave } = this.props;
        return (
          <Modal isOpen={true} toggle={toggle}>
            <ModalHeader toggle={toggle}> Shipment Item </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="shipmentId">Shipment Number</Label>
                  <Input
                    type="text"
                    name="shipmentId"
                    value={this.state.activeItem.shipmentId}
                    onChange={this.handleChange}
                    placeholder="Enter Shipment Number"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="shipmentName">Shipment Name</Label>
                  <Input
                    type="text"
                    name="shipmentName"
                    value={this.state.activeItem.shipmentName}
                    onChange={this.handleChange}
                    placeholder="Enter shipment Name"
                  />
				   </FormGroup>
                  <FormGroup check>
                  <Label for="shipmentStatus">
                    <Input
                      type="checkbox"
                      name="shipmentStatus"
                      checked={this.state.activeItem.shipmentStatus}
                      onChange={this.handleChange}
                    />
                    Shipment Status 
                  </Label>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                Save
              </Button>
            </ModalFooter>
          </Modal>
        );
      }
    }