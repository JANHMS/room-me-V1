import { isPlatform } from "@ionic/react";
import { useRef, useState } from "react";
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';

const { Camera } = Plugins;

export const handleFileChange1 = (event: React.ChangeEvent<HTMLInputElement>, setimage1) => {
  if (event.target.files.length > 0) {
    const file = event.target.files.item(0);
    const image1 = URL.createObjectURL(file);
    setimage1(image1);
  }
};

//first picture
export const handlePictureClick1 = async (setimage1, fileInputRef1) => {
  if (isPlatform('capacitor')) {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        width: 600,
      });
      setimage1(photo.webPath)
    } catch (error) {
      console.log('Camera error:', error);
    }
  } else {
    fileInputRef1.current.click();
  }
}

//second picture
export const handleFileChange2 = (event: React.ChangeEvent<HTMLInputElement>, setimage2) => {
  if (event.target.files.length > 0) {
    const file = event.target.files.item(0);
    const image2 = URL.createObjectURL(file);
    setimage2(image2);
  }
};

export const handlePictureClick2 = async (setimage2, fileInputRef2) => {
  if (isPlatform('capacitor')) {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        width: 600,
      });
      setimage2(photo.webPath)
    } catch (error) {
      console.log('Camera error:', error);
    }
  } else {
    fileInputRef2.current.click();
  }
};

//third picture
export const handleFileChange3 = (event: React.ChangeEvent<HTMLInputElement>, setimage3) => {
  if (event.target.files.length > 0) {
    const file = event.target.files.item(0);
    const image3 = URL.createObjectURL(file);
    setimage3(image3);
  }
};

export const handlePictureClick3 = async (setimage3, fileInputRef3) => {
  if (isPlatform('capacitor')) {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        width: 600,
      });
      setimage3(photo.webPath)
    } catch (error) {
      console.log('Camera error:', error);
    }
  } else {
    fileInputRef3.current.click();
  }
};
//fourth picture
export const handleFileChange4 = (event: React.ChangeEvent<HTMLInputElement>, setimage3) => {
  if (event.target.files.length > 0) {
    const file = event.target.files.item(0);
    const image3 = URL.createObjectURL(file);
    setimage3(image3);
  }
};

export const handlePictureClick4 = async (setimage4, fileInputRef4) => {
  if (isPlatform('capacitor')) {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        width: 600,
      });
      setimage4(photo.webPath)
    } catch (error) {
      console.log('Camera error:', error);
    }
  } else {
    fileInputRef4.current.click();
  }
};