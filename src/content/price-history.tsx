import React from "react";
import { AiOutlineLineChart, AiOutlineCloseCircle } from "react-icons/ai";
import Modal from 'react-modal';
import PriceHistoryChart from "./price-history-chart";
import {Size} from "../model/size";

const customStyles = {
  content: {
    bottom: 'auto',
  },
  overlay: { zIndex: 1000 }
};

interface PriceHistoryProps {
  searchData: Size
}

Modal.setAppElement('#app');

const PriceHistory: React.FC<PriceHistoryProps>= (props) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <span>
      <span onClick={openModal}><AiOutlineLineChart /></span>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button style={{ float: "right" }} onClick={closeModal}><AiOutlineCloseCircle /></button>
        <div style={{ width: "auto" }}>
          <PriceHistoryChart searchData={props.searchData} />
        </div>
      </Modal>
    </span>
  )
}

export default PriceHistory
