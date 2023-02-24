import React, { Dispatch, SetStateAction, useState } from 'react';
import PredictionsTable from './PredictionsTable';


export interface Image {
    filename: string;
    size: number;
    time: Date;
  }

interface PredictionsTabProps {
    images: Image[];
    setImages: Dispatch<SetStateAction<Image[]>>;
  }
  
export const PredictionsTab: React.FC<PredictionsTabProps> = (props: PredictionsTabProps) => {

  const [showDialog, setShowDialog] = useState(false);

  const handleView = () => {
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  return (
    <div className="tab">
      <h2>Predictions</h2>
      <PredictionsTable images={props.images} handleView={handleView} />
    </div>
  );
}

