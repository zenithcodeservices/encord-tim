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
import Image from "next/image"




export interface PredictDialogProps {
  open: boolean;
  images: MyImage[];
  index: number;
  onClose: (value: string) => void;
}


export const PredictDialog = (props: PredictDialogProps) => {

  const {open, images,index, onClose} = props


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <h3>Image Prediction</h3>
        <div className={styles.imgContainer}>
            <Image alt={images[index]?.filename} src={images[index]?.filename} width={200} height={200} layout="responsive" objectFit={'contain'} />
        </div>
      </DialogContent>
    </Dialog>
  );


}
