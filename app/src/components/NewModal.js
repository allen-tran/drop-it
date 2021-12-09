import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
} from "reactstrap";
import { updateObject, deleteObject } from "../functions/S3Functions";
import { deleteFile, updateFile } from "../functions/RDSFunctions";
import { getAuthInfo } from "../functions/AuthFunctions";

function NewModal(props) {
  const [userId, setUserId] = useState();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [itemExists, setItemExists] = useState(false);
  const [showModal, toggleModal] = useState(false);
  const [showSavedOrDeletedModal, toggleSavedOrDeletedModal] = useState(false);
  const [fileValid, setFileValid] = useState(true);
  const [size, setSize] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    getUserId();
  });

  async function getUserId() {
    if (!props.showEditModal) return;
    setUserId(await getAuthInfo());
  }

  let footerButtons = [
    {
      text: fileValid ? "save" : "file too large",
      enabled: fileValid,
      callback: handleSave, color: "primary"
    },
    {
      text: "delete file",
      enabled: fileValid,
      callback: handleDelete, color: "primary"
    },
    {
      text: "cancel",
      enabled: true,
      callback: props.toggleShowEditModal, color: "danger"
    }
  ];

  function onFileChange(e) {
    if (!e.target.files[0]) return;
    if (e.target.files[0].size > 1e7) {
      setFileValid(false);
    } else {
      setFile(e.target.files[0]);
      setSize(e.target.files[0].size);
      if (!fileValid) {
        setFileValid(true);
      }
    }
  }

  function handleDelete() {
    deleteObject(props.item.file_id);
    deleteFile(userId, props.item.entry_id);
    toggleSavedOrDeletedModal(true);
  }

  function isUpdated(newVal, oldVal) {
    if (!newVal) return undefined;
    return newVal !== oldVal ?
      newVal : undefined;
  }

  async function handleSave() {
    let fileId = undefined;
    if (file) {
      fileId = await updateObject(file, props.item.file_id);
    }
    const newData = {
      entryId: props.item.entry_id,
      userId: userId,
      title: isUpdated(title.trim(), props.item.title.trim()),
      fileName: fileId ? fileId.key : "",
      size: isUpdated(size, props.item.size),
      description: isUpdated(description.trim(),
        props.item.description.trim())
    };
    updateFile(newData);
    toggleSavedOrDeletedModal(true);
    setItemExists(true);
  }

  let itemFields = props.item ? [
    {
      name: "Title", defaultValue: props.item.title,
      callback: (e) => setTitle(e.target.value), inputType: "text"
    },
    {
      name: "File", defaultValue: props.item.file,
      callback: onFileChange, inputType: "file"
    },
    {
      name: "Description", defaultValue: props.item.description,
      callback: (e) => setDescription(e.target.value), inputType: "textarea"
    }
  ] : [];

  return (
    props.showEditModal &&
    <React.Fragment>
      <Modal
        isOpen={showSavedOrDeletedModal}
        toggle={() => toggleModal(!showModal)}
      >
        <ModalHeader>
          Item {itemExists ? "saved" : "deleted"}.
        </ModalHeader>
        <ModalFooter>
          <Button
            // eslint-disable-next-line no-restricted-globals
            onClick={() => { location.reload(); }}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={props.showEditModal}
        toggle={() => toggleModal(!showModal)}
      >
        <Form>
          <ModalHeader>
            Edit Item
          </ModalHeader>
          <ModalBody>
            {itemFields.map((x, index) => {
              return (
                <Input
                  key={index}
                  placeholder={x.name}
                  onChange={x.callback}
                  defaultValue={x.defaultValue}
                  type={x.inputType}
                />
              );
            })}
          </ModalBody>
          <ModalFooter>
            {footerButtons.map((btn, index) => {
              return (
                <Button
                  key={index}
                  disabled={!btn.enabled}
                  className={`btn btn-${btn.color}`}
                  onClick={btn.callback}>
                  {btn.text}
                </Button>
              );
            })}
          </ModalFooter>
        </Form>
      </Modal >
    </React.Fragment>
  );
}

export default NewModal;