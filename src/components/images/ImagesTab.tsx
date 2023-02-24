import styles from "../../styles/ImagesTab.module.css";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ImageProps, MyImage } from "@/pages";
import { ImageUpload } from "./ImageUpload";
import { ImageTable } from "./ImageTable";


interface ImagesTabProps {
  images: MyImage[];
  setImages: Dispatch<SetStateAction<MyImage[]>>;
}

export const ImagesTab: React.FC<ImagesTabProps> = (props: ImagesTabProps) => {

  
  const [showDialog, setShowDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handlePredict = (image: string) => {
    setSelectedImage(image);
    setShowDialog(true);
  };

  const handleDialogSubmit = (title: string, description: string) => {
    // TODO: make API request and save prediction
    
    setShowDialog(false);
  };

  const handleDialogCancel = () => {
    setShowDialog(false);
  };

  return (
    <div className={styles.center}>
      <h2>Images</h2>
      <ImageUpload images={props.images} setImages={props.setImages} />
      <ImageTable images={props.images} />
    </div>
  )

}
