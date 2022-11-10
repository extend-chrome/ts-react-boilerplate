import React, { useEffect, useState } from "react";
import { Perfumehub } from "../provider/perfumehub";
import { AiOutlineLineChart, AiOutlineCloseCircle } from "react-icons/ai";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns';


import Modal from 'react-modal';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,

)

const customStyles = {
  content: {
    // top: '50%',
    // left: '50%',
    // right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    // transform: 'translate(-50%, -50%)',
  },
  overlay: { zIndex: 1000 }
};

Modal.setAppElement('#app');

const PriceHistory = (props: any) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const provider = new Perfumehub
  let graphData: any;

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    provider.getPriceHistory(props.searchData)
      .then((response) => {
        data.datasets[0].data = response;
        setData(data)
      }
      )
  }, [])

  function closeModal() {
    setIsOpen(false);
  }

  const options = {
    responsive: true,
    type: 'line',
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return context.raw.price + provider.getCurrency() + ' ' + context.raw.shopNameReal;
          }
        }
      }
    },
    parsing: {
      xAxisKey: 'date',
      yAxisKey: 'price'
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        }
      }
    }

  };

  const [data, setData] = useState({
    datasets: [{
      label: chrome.i18n.getMessage("price_history"),
      data: graphData,
      borderColor: '#63bbff',
      backgroundColor: '#63bbff',
    },]
  })


  return (
    <span>
      <span onClick={openModal}><AiOutlineLineChart /></span>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button style={{ float: "right" }} onClick={closeModal}><AiOutlineCloseCircle /></button>

        <div style={{ width: "auto" }}>
          <Line options={options} data={data} />
        </div>
      </Modal>
    </span>
  )
}

export default PriceHistory
