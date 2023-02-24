import styles from "../../styles/ImagesTab.module.css";
import React, { useState } from "react";
import {  MyImage, PredictionData } from "@/pages";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core'
import https from "https";
import Image from "next/image"




export interface PredictDialogProps {
  open: boolean;
  images: MyImage[];
  index: number;
  onClose: (value: string) => void;
}


export const PredictDialog = (props: PredictDialogProps) => {

  const {open, images, index, onClose} = props


  return (
    <Dialog open={open} onClose={onClose} fullWidth={true}>
      <DialogContent>
        <h3>Image Prediction</h3>
        <div className={styles.imgContainer}>
            {/* <Image alt={images[index]?.filename} src={images[index]?.filename} width={200} height={200} layout="responsive" objectFit={'contain'} /> */}
            <div style={{backgroundImage: `url(${images[index]?.filename})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", width:400, height:300 }}>
            <svg width="400" height="300">
                {images[index]?.prediction.predictions?.map((pred) => {
                    console.log(pred)
                    console.log("??????", ((pred.bbox.x2 - pred.bbox.x1)/1600)*400);
                    console.log("!!!!!!", ((pred.bbox.y2 - pred.bbox.y1)/1200)*300);

                  
                    //<path stroke="blue" stroke-width="1" d="M0 10 100 100" />
                    //<path stroke="blue" stroke-width="1" d={`M0 ${pred.bbox.x1} 100 100`} />
                    return <rect x={`${(pred.bbox.x1/1600)*400}`} y={`${(pred.bbox.y1/1200)*300}`} style={{ display: "inline-block" }} width={`${((pred.bbox.x2 - pred.bbox.x1) / 1600) * 400}`} height={`${((pred.bbox.y2 - pred.bbox.y1) / 1200) * 300}px`} style={{ fill: 'rgb(0,0,255)', fillOpacity: 0.01, strokeWidth: 1, stroke: 'rgb(0,0,128)' }} />
                })}
              </svg>
            </div>
        </div>
        
      </DialogContent>
    </Dialog>
  );


}
