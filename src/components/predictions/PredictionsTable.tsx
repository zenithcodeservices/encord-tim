import { MyImage } from '@/pages';
import React from 'react';
import styles from "../../styles/PredictionsTable.module.css";
import { PredictDialog } from './PredictDialog';

export default function PredictionsTable({ images, handleView }) {

  const [open, setOpen] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(-1)

  const handleClickOpen = (index: number) => {
    setSelectedIndex(index)
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
    };


  return (
    <table className={styles.tableStyle}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Score</th>
          <th>VIEW</th>
        </tr>
      </thead>
      <tbody>
        {images.map((image: MyImage, index: number) => (
          
            image.prediction ? (
              <tr key={image.filename}>
                <td>{image.prediction.title}</td>
                <td>{image.prediction.description}</td>
                <td>{image.prediction.predictions.map((item) => <td>{item.score}</td>)}</td>
                <td>
                  <button className={styles.predictBtn} onClick={() => handleClickOpen(index)}>VIEW</button>
                </td>
              </tr>
            ) : null
        )
        )}
        <PredictDialog
            open={open}
            images={images}
            index={selectedIndex}
            onClose={handleClose}
          />
      </tbody>
    </table>
  );
}
