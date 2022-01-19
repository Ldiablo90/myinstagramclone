import React, { useState } from 'react';
import { Button, Image, View  } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { fireAuth, fireStore, fireStorage } from '../firebase'

const { getAuth } = fireAuth
const { getFirestore, doc, addDoc, collection } = fireStore
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = fireStorage

const AddFeedScreen = ({navigation}) => {

    const [image, setImage] = useState('https://picsum.photos/200/200');
    const storage = getStorage();
    const auth = getAuth();
    const store = getFirestore();

    const uploadImage = async () => {

        const uri = image;
        const childPath = `post/${auth.currentUser.uid}/${Math.random().toString(36)}`;
        const response = await fetch(uri);
        const blol = await response.blob();
        const storageRef = ref(storage, childPath);
        const uploadTask = uploadBytesResumable(storageRef,blol);

        const taskProgress = snapshot => {
            console.log(`transferred : ${snapshot.bytesTransferred}`)
        }
        const taskError = snapshot => {
            console.log(snapshot) 
        }
        const taskCompleted = () => {
            getDownloadURL(uploadTask.snapshot.ref).then(snapshot => savePostData(snapshot))
        }
        uploadTask.on('state_changed', taskProgress, taskError, taskCompleted);
    }

    const savePostData = (downloadURL)=>{
        addDoc(collection(doc(store,'posts',auth.currentUser.uid),'userPosts'),{
            downloadURL,image, creation: store.FieldValue.serverTimerstamp()
        }).then(()=> navigation.goBack())
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            <Button title='Save' onPress={uploadImage} />
        </View>
    );
}
export default AddFeedScreen