import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../auth';
import { firestore, storage } from '../../firebase';
import AddEntryComponent from '../../components/AddEntryComponent';
import withAuthorization from '../../hoc/withAuthorization';
import * as api from '../../api';

import { toast } from '../../toast';
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
interface Props {
  auth: any;
}
const AddEntryPage: React.FC<Props> = ({
  auth
}) => {
  const { userId } = useAuth();
  const history = useHistory();
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaLink, setMediaLink] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('room')
  const [price, setPrice] = useState('')
  
  const handleSave = async () => {
    const entriesRef = firestore.collection('services')
    // const user = firestore.doc('profiles/' + userId)
    const entryData = { category, description, date, price, title, location, mediaLink, userId };

    const entryRef = await entriesRef.add(entryData).then(()=> {
      // entryData.user = api.createRef('profiles', userId)
      history.push('/my/entries/add/picture/0');
    })

    console.log('saved:', entryRef);
    toast("Sucessfully created")
    history.goBack();
  };

  return (
    <AddEntryComponent
      auth={auth}
      price={price}
      setPrice={setPrice}
      date={date}
      setDate={setDate}
      title={title}
      setTitle={setTitle}
      handleSave={handleSave}
      description={description}
      setDescription={setDescription}
      category={category}
      setCategory={setCategory}
      mediaLink={mediaLink}
      setMediaLink={setMediaLink}
      location={location}
      setLocation={setLocation}
    />
  );
};

export default AddEntryPage;
