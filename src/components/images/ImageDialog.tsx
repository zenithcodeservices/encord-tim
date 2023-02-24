import styles from "../../styles/ImagesTab.module.css";
import React, { useState } from "react";
import {  MyImage, PredictionData } from "@/pages";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core'
import LoadingSpin from "react-loading-spin";
import https from "https";



export interface ImageDialogProps {
  open: boolean;
  image: MyImage;
  onClose: (value: string) => void;
}

interface Bbox {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

interface Prediction {
  bbox: Bbox;
  label: string;
  score: string;
}

interface Predictions {
  description: string;
  predictions: Prediction[];
}




export const ImageDialog = (props: ImageDialogProps) => {

  const {open, image, onClose} = props
  const [loading, setLoading] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState("");


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addPrediction = (data: any) => {
    image.prediction.title = title !== undefined ? title : "Test"
    image.prediction.description = description !== undefined ? description : "Test"
    data.predictions.forEach((pred: PredictionData) => {
      image.prediction.predictions.push(pred)
    })
    console.log("image", image);
    
  }

  const convertNegativeBboxToZero = (predictions: Predictions): Predictions => {
    const convertedPredictions: Predictions = { ...predictions };
    convertedPredictions.predictions = predictions.predictions.map((prediction) => {
      const convertedPrediction: Prediction = { ...prediction };
      const bbox: Bbox = { ...prediction.bbox };
      bbox.x1 = bbox.x1 < 0 ? 0 : bbox.x1;
      bbox.x2 = bbox.x2 < 0 ? 0 : bbox.x2;
      bbox.y1 = bbox.y1 < 0 ? 0 : bbox.y1;
      bbox.y2 = bbox.y2 < 0 ? 0 : bbox.y2;
      convertedPrediction.bbox = bbox;
      return convertedPrediction;
    });
    return convertedPredictions;
  
  }

  const handleSubmit = async () => {
    // TODO: make API request and save prediction
    try {
      setLoading(true);
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });

      const res = await fetch("http://localhost:3000/predict");

      if (!res.ok) {
        setErrorMessage(`Error! status: ${res.status}`);
        throw new Error(`Error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("data", data);
      const newData = convertNegativeBboxToZero(data)
      addPrediction(newData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    //
  }


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <h3>Predict Image</h3>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
      {loading && (
        <div className={styles.loading}>
          <li>
            <LoadingSpin primaryColor="#00D39" />
          </li>
        </div>
      )}
      {errorMessage !== "" && <p>{errorMessage}</p>}
    </Dialog>
  );


}
