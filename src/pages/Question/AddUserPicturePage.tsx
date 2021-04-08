import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../auth';
import { firestore, storage } from '../../firebase';


import { toast } from '../../toast';
import AddUserPictureComponent from '../../components/Question/AddUserPictureComponent';
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
  const [image, setimage] = useState('/assets/placeholder.png');
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
    const entriesRef = firestore.collection('profiles').doc(userId)
    // const user = firestore.doc('profiles/' + userId)
    const entryData = { image, userId };
    if (!image.startsWith('/assets')) {
      entryData.image = await savePicture(image, userId);
    }
    //merge true does not override it just adds additional data
    const entryRef = await entriesRef.set(entryData, { merge: true }).then(()=> {
      // entryData.user = api.createRef('profiles', userId)
      history.push("/my/register/question/1");
    })

    console.log('saved:', entryRef);
    toast("Sucessfully created")
  };

  return (
    <AddUserPictureComponent
      auth={auth}
      image={image}
      fileInputRef={fileInputRef}
      handleFileChange={handleFileChange}
      handlePictureClick={handlePictureClick}
      handleSave={handleSave}
    
    />
  );
};

export default AddEntryPage;
