import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../auth';
import { firestore, storage } from '../../firebase';
import AddEntryComponent from '../../components/AddEntryComponent';
const { Camera } = Plugins;

async function savePicture(blobUrl, userId) {
  const pictureRef = storage.ref(`/users/${userId}/pictures/${Date.now()}`);
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const snapshot = await pictureRef.put(blob);
  const url = await snapshot.ref.getDownloadURL();
  console.log('saved picture:', url);
  return url;
}

const AddEntryPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [image, setimage] = useState('/assets/placeholder.png');
  const [description, setDescription] = useState('');
  const [mediaLink, setMediaLink] = useState('');
  const [category, setCategory] = useState('room')

  const fileInputRef = useRef<HTMLInputElement>();
  useEffect(() => () => {
    if (image.startsWith('blob:')) {
      URL.revokeObjectURL(image);
    }
  }, [image]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const image = URL.createObjectURL(file);
      setimage(image);
    }
  };

  const handlePictureClick = async () => {
    if (isPlatform('capacitor')) {
      try {
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Prompt,
          width: 600,
        });
        setimage(photo.webPath);
      } catch (error) {
        console.log('Camera error:', error);
      }
    } else {
      fileInputRef.current.click();
    }
  };

  const handleSave = async () => {
    const entriesRef = firestore.collection('services')
    const entryData = { date, title, image, description };
    if (!image.startsWith('/assets')) {
      entryData.image = await savePicture(image, userId);
    }
    const entryRef = await entriesRef.add(entryData);
    console.log('saved:', entryRef.id);
    history.goBack();
  };

  
  return (
    <AddEntryComponent
      date={date}
      setDate={setDate}
      title={title}
      setTitle={setTitle}
      image={image}
      fileInputRef={fileInputRef}
      handleFileChange={handleFileChange}
      handlePictureClick={handlePictureClick}
      handleSave={handleSave}
      description={description}
      setDescription={setDescription}
      category={category}
      setCategory={setCategory}
      mediaLink={mediaLink}
      setMediaLink={setMediaLink}
    />
  );
};

export default AddEntryPage;
