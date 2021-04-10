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

async function savePicture4(blobUrl, userId) {
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
  const [address, setAddress] = useState('');
  const [image, setimage] = useState('/assets/placeholder.png');
  const [image1, setimage1] = useState('/assets/placeholder.png');
  const [image2, setimage2] = useState('/assets/placeholder.png');
  const [image3, setimage3] = useState('/assets/placeholder.png');
  const [image4, setimage4] = useState('/assets/placeholder.png');

  
  const [description, setDescription] = useState('');
  const [mediaLink, setMediaLink] = useState('');
  const [citylocation, setCitylocation] = useState('');
  const [category, setCategory] = useState('room')
  const [price, setPrice] = useState('')

  const fileInputRef = useRef<HTMLInputElement>();
  const fileInputRef1 = useRef<HTMLInputElement>();
  const fileInputRef2 = useRef<HTMLInputElement>();
  const fileInputRef3 = useRef<HTMLInputElement>();
  const fileInputRef4 = useRef<HTMLInputElement>();

  
  useEffect(() => () => {
    if (image.startsWith('blob:')) {
      URL.revokeObjectURL(image);
    }
  }, [image]);
  
  useEffect(() => () => {
    if (image1.startsWith('blob:')) {
      URL.revokeObjectURL(image1);
    }
  }, [image1]);
  
  useEffect(() => () => {
    if (image2.startsWith('blob:')) {
      URL.revokeObjectURL(image2);
    }
  }, [image2]);
  
  useEffect(() => () => {
    if (image3.startsWith('blob:')) {
      URL.revokeObjectURL(image3);
    }
  }, [image3]);
  
  useEffect(() => () => {
    if (image4.startsWith('blob:')) {
      URL.revokeObjectURL(image4);
    }
  }, [image4]);
  
  // 0 picture
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
        setimage(photo.webPath)
      } catch (error) {
        console.log('Camera error:', error);
      }
    } else {
      fileInputRef.current.click();
    }
  };
  
  //first picture
  const handleFileChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const image1 = URL.createObjectURL(file);
      setimage1(image1);
    }
  };

  const handlePictureClick1 = async () => {
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
  const handleFileChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const image2 = URL.createObjectURL(file);
      setimage2(image2);
    }
  };

  const handlePictureClick2 = async () => {
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
  const handleFileChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const image3 = URL.createObjectURL(file);
      setimage3(image3);
    }
  };

  const handlePictureClick3 = async () => {
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
  const handleFileChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const image4 = URL.createObjectURL(file);
      setimage4(image4);
    }
  };

  const handlePictureClick4 = async () => {
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
  

  
  const handleSave = async () => {
    const entriesRef = firestore.collection('services')
    // const user = firestore.doc('profiles/' + userId)
    const entryData = { category, description, date, citylocation, mediaLink, image, image1, image2, image3, image4, price, address, userId };
    if (!image.startsWith('/assets')) {
      entryData.image = await savePicture(image, userId);

      entryData.image1 = await savePicture(image1, userId);

      entryData.image2 = await savePicture(image2, userId);
  
      entryData.image3 = await savePicture(image3, userId);

      entryData.image4 = await savePicture(image4, userId);
    }
    const entryRef = await entriesRef.add(entryData).then(()=> {
      // entryData.user = api.createRef('profiles', userId)
      history.goBack();
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
      address={address}
      setAddress={setAddress}
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
      citylocation={citylocation}
      setCitylocation={setCitylocation}
      fileInputRef1={fileInputRef1}
      handleFileChange1={handleFileChange1}
      handlePictureClick1={handlePictureClick1}
      image1={image1}
      
      fileInputRef2={fileInputRef2}
      handleFileChange2={handleFileChange2}
      handlePictureClick2={handlePictureClick2}
      image2={image2}
      
      fileInputRef3={fileInputRef3}
      handleFileChange3={handleFileChange3}
      handlePictureClick3={handlePictureClick3}
      image3={image3}
      
      fileInputRef4={fileInputRef4}
      handleFileChange4={handleFileChange4}
      handlePictureClick4={handlePictureClick4}
      image4={image4}
    />
  );
};

export default AddEntryPage;