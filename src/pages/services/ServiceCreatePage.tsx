import { Redirect } from 'react-router-dom'
import { createService } from '../../actions'
import { useAuth } from '../../auth'
import CreateServiceComponent from '../../components/service/CreateServiceComponent'
import { toast } from '../../toast'
import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
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

const ServiceCreate: React.FC = () => {
  
  const { userId } = useAuth();
  const [date, setDate] = useState('');

  const [ redirect, setRedirect ] = useState(false)
  const [ serviceForm, setServiceForm ] = useState({
    category: 'mathematics',
    date:'',
    title: '',
    description: '',
    image: '/assets/placeholder.png',
    price: null
  })
  
  const fileInputRef = useRef<HTMLInputElement>();

  useEffect(() => () => {
    if (serviceForm.image.startsWith('blob:')) {
      URL.revokeObjectURL(serviceForm.image);
    }
  }, [serviceForm.image]);
  
  const handlePictureClick = async () => {
    if (isPlatform('capacitor')) {
      try {
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Prompt,
          width: 600,
        });
        setServiceForm({
          ...serviceForm,
          image: photo.webPath});
      } catch (error) {
        console.log('Camera error:', error);
      }
    } else {
      fileInputRef.current.click();
    }
  };
  
  const handleChange = e => {
    const { name, value } = e.target
    setServiceForm({...serviceForm, [name]: value})
  }

  const handleSubmit = () => {
    createService(serviceForm, userId)
      .then(() => setRedirect(true))
      .catch(() => toast('SOME ERROR!'))
  }

  if (redirect) {
    toast("Sucessfully created")
    return <Redirect to="/my/entries" />
  }

  return (
    <CreateServiceComponent 
      setDate={setDate}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handlePictureClick={handlePictureClick}
      fileInputRef={fileInputRef}
      image={serviceForm.image}
      date={date}
    />
  )
}

export default ServiceCreate;