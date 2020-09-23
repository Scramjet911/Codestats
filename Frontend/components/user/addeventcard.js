import Head from "next/head";
import Link from "next/link";
import Modal from "react-modal";
import React, { useState } from "react";
import Eventform from "../eventform.js";

function Addeventcard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div>
      <div className="card card-addevent">
        <button
          type="button"
          className="btn btn-vlg btn-outline-light"
          onClick={() => setModalIsOpen(true)}
        >
          ADD EVENT
        </button>
      </div>
      <Modal
        closeTimeoutMS={500}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="ModalB"
        overlayClassName="Overlay"
      >
        <h1 className="display-4">Add Event</h1>
        <Eventform handleClose={() => setModalIsOpen(false)} />
      </Modal>
    </div>
  );
}
export default Addeventcard;
