import React, { useState } from 'react';
import { MyImage } from '@/pages';
import styles from "../../styles/Home.module.css";
import Image from "next/image"
import {ImageDialog} from './ImageDialog';


interface ImageTableProps {
  images: MyImage[];
}


export const ImageTable: React.FC<ImageTableProps> = (props: ImageTableProps) => {


  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
    };


  return (
    <><table className={styles.tableStyle}>
      <thead>
        <tr>
          <th>Preview</th>
          <th>Filename</th>
          <th>Size</th>
          <th>Time of Upload</th>
          <th>PREDICT</th>
        </tr>
      </thead>
      <tbody>
        {props.images.map((image) => (
          <><tr key={image.filename}>
            <div className={styles.imgContainer}>
              <Image alt={image.filename} src={image.filename} width={15} height={15} layout="responsive" objectFit={'contain'} />
            </div>
            <td>{image.filename}</td>
            <td>{image.size}</td>
            <td>{image.time.toLocaleString()}</td>
            <td>
              <button className={styles.predictBtn} onClick={() => handleClickOpen()}>PREDICT</button>
            </td>
          </tr>

          <ImageDialog
            open={open}
            image={image}
            onClose={handleClose}
          />
          </>
        ))}
      </tbody>
    </table>

    </>
  );
}
