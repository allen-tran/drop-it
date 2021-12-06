import React, { useState, useEffect } from "react";
import { Container, Button, Row, Input } from "reactstrap";
import { getAuthInfo } from "../functions/AuthFunctions";
import { uploadObject } from "../functions/S3Functions";
import { addFileToTable } from "../functions/RDSFunctions";

function UploadView(appProps) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [size, setSize] = useState();
  const [description, setDescription] = useState("");
  const [fileValid, setFileValid] = useState(true);
  const [userId, setUserId] = useState();

  const fields = [
    <Input placeholder="what should we call this?"
      onChange={(e) => setTitle(e.target.value)} />,
    <Input type="file" onChange={onFileChange} />,
    <Input
      placeholder="what is this?"
      type="textarea" onChange={
        (e) => setDescription(e.target.value)} />,
    <Button
    style={fileValid ? {backgroundColor: '#c0d6df'}: {backgroundColor: 'danger'}}
      disabled={!isUploadAllowed()}
      onClick={async () => await uploadFile(file)}>
      {fileValid ? "drop" : "file too big! (>10MB)."}
    </Button>,
  ];

  useEffect(() => {
    storeUserId();
    // eslint-disable-next-line
  }, []);

  async function storeUserId() {
    setUserId(await getAuthInfo());
  }

  async function uploadFile() {
    console.log("Yo!");
    let fileId = await uploadObject(file);
    await addFileToTable({
      userId: userId,
      fileId: fileId.key,
      title: title ? title : file.name,
      size: size,
      description: description
    });
    alert("file sucessfully uploaded!");
  }

  function onFileChange(e) {
    if (!e.target.files[0]) return;
    setFile(e.target.files[0]);
    if (e.target.files[0].size > 1e7) {
      setFileValid(false);
    } else {
      setSize(e.target.files[0].size);
      if (!fileValid) {
        setFileValid(true);
      }
    }
  }

  function isUploadAllowed() {
    return file && fileValid;
  }

  return (
    <Container>
      {fields.map((x, index) => {
        return (
          <div>
          <Row key={index} style={{ width: "auto", padding: 10, justifyContent:"right", display:"flex", alignItems:"right"}}>
            {x}
          </Row>

          </div>
        );
      })}
    </Container>
  );
}

export default UploadView;