import React, { useState } from 'react';
import { Button, Image, View, TextInput  } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { fireAuth, fireStore, fireStorage } from '../firebase'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserPosts } from '../redux/actions';


const { getAuth } = fireAuth
const { getFirestore, doc, setDoc, collection, serverTimestamp } = fireStore
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = fireStorage

const AddFeedScreen = (props) => {

    const {navigation} = props;
    const [image, setImage] = useState('https://picsum.photos/200/200');
    const [explanation, setExplanation] = useState('');
    const storage = getStorage();
    const auth = getAuth();
    const db = getFirestore();

    const uploadImage = async () => {

        const childPath = `post/${auth.currentUser.uid}/${Math.random().toString(36)}`;
        const response = await fetch(image);
        const blol = await response.blob();
        const storageRef = ref(storage, childPath);
        const uploadTask = uploadBytesResumable(storageRef,blol);

        const taskProgress = snapshot => {
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
        const fireOut = doc(db, 'posts', auth.currentUser.uid)
        const fireInner = doc(collection(fireOut, 'userPosts'))

        setDoc(fireInner,{
            downloadURL,explanation, creation: serverTimestamp()
        }).then(()=> {
            props.fetchUserPosts()
            navigation.goBack()
        })
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
            <TextInput placeholder='It is Title' onChangeText={(e) => setExplanation(e)}/>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            <Button title='Save' onPress={uploadImage} />
        </View>
    );
}

const mapDispatchProps = (dispatch) => bindActionCreators({
    fetchUserPosts
}, dispatch)



export default connect(null, mapDispatchProps)(AddFeedScreen)