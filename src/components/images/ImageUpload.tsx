import { ImageProps } from '@/pages';
import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import styles from "../../styles/ImageUpload.module.css";

export function ImageUpload({ setImages }: ImageProps) {
  

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as ArrayLike<File>)
    const uploadedImages = files.map((file) => {
      return {
        filename: URL.createObjectURL(file),
        size: file.lastModified,
        time: new Date(),
        prediction: {
          title: "",
          description: "",
          time: new Date(),
          predictions: [{
              bbox: {
              x1: 0,
              x2: 0,
              y1: 0,
              y2: 0,
             },
             label: "",
             score: ""
          }]
        }
      }
    });
    setImages((prevImages) => [...prevImages, ...uploadedImages])
  };


  return (
    <div>
      <Button>
        <label className={styles.customFileUpload} htmlFor="file-upload">Upload Files</label>
      </Button>
      <input style={{display:"none"}} id="file-upload" type="file" onChange={(e) => handleImageUpload(e)} multiple />
    </div>
  );

}
