import { MyImage } from '@/pages';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {PredictionsTable} from './PredictionsTable';
import styles from "../../styles/PredictionsTab.module.css";


export interface Image {
    filename: string;
    size: number;
    time: Date;
  }

interface PredictionsTabProps {
    images: MyImage[];
    setImages: Dispatch<SetStateAction<MyImage[]>>;
  }
  
export const PredictionsTab: React.FC<PredictionsTabProps> = (props: PredictionsTabProps) => {

  const [showDialog, setShowDialog] = useState(false);


  return (
    
    <div className={styles.center}>
      <h2>Predictions</h2>
      <br></br>
      <PredictionsTable images={props.images} />
    </div>
  );
}

