import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type MyVerticallyCenteredModalProps = {
  show: boolean;
  onHide: () => void;
  title: string;
  content: React.ReactNode;
};

const MyVerticallyCenteredModal: React.FC<MyVerticallyCenteredModalProps> = ({ show, onHide, title, content }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
