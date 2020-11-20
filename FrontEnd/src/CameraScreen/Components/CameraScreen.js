import React, {Component} from 'react';
import {View, Text, TouchableOpacity, PermissionsAndroid, Platform, Image} from 'react-native';
import styles from '../Styles/CameraScreenStyles.js';
import {RNCamera} from 'react-native-camera';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux'
import {imageToBlob} from 'react-native-image-to-blob';
import axios from 'axios';

class CameraScreen extends Component {
  constructor(props) {
    super();
    if (Platform.OS === 'android') {
      this.requestCameraPermission();
      this.requestStorageWritePermissions();
      this.requestStorageReadPermissions();
    }

    console.log(props);

    this.state = {
      paintBrushIconPressed: false,
      savedImageInfo: {},
      imageURI: '',
      imageSaved: false
    }
  }

  async requestStorageReadPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Diggraffiti',
          message: 'Let Diggrafiti Read From External Storage',
        },
      );
      granted === PermissionsAndroid.RESULTS.GRANTED ? console.log('You can read from external storage') : console.log('Cannot read from external storage');
    } catch (err) {
      console.warn(err);
    }
  }

  async requestStorageWritePermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Diggraffiti',
          message: 'Let Diggrafiti Write to External Storage',
        },
      );
      granted === PermissionsAndroid.RESULTS.GRANTED ? console.log('You can write to external storage') : console.log('Cannot write to external storage');
    } catch (err) {
      console.warn(err);
    }
  }

  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Diggraffiti',
          message: 'Let Diggrafiti Access the Camera',
        },
      );
      granted === PermissionsAndroid.RESULTS.GRANTED ? console.log('You can use the camera') : console.log('Camera permission denied');
    } catch (err) {
      console.warn(err);
    }
  }

  jumpToMapScreen() {
    this.props.navigation.navigate('MapScreen');
  }

  paintBrushPressed(){
    this.setState({paintBrushIconPressed: !this.state.paintBrushIconPressed});
  }

  captureSketch(success, path){
    if (success){
      console.log("saved sketch location: " + path);
      let url = "file://" + path;
      this.setState({imageSaved: success});
      this.setState({imageURI: url},()=>{this.sendSketchToBackEnd()});
    }else{
      console.log("Image didn't save!");
    }
  }

  async sendSketchToBackEnd(){
    let email = this.props.email;
    let sketchLocation = [23.4556, 46.435];
    let imageFile = await imageToBlob(this.state.imageURI);
    console.log("this is the image file: " + imageFile);
    console.log("user email: " + email);
    console.log("sketch location: " + sketchLocation);

    let bodyFromData = new FormData();
    bodyFromData.append("file", imageFile);
    bodyFromData.append("user", email);
    bodyFromData.append("coordinates", sketchLocation);

    axios({
      method: 'post',
      url: 'http://localhost:1234/api/image/upload',
      headers: {'Content-Type': 'multipart/form-data' },
      data: bodyFromData
    })
    .then((response) => { 

      console.log(response);
      
    }, (error) => {
      console.log(error)

    });
  }

  render() {
    console.log("image uri: " + this.state.imageURI);
    return (
      <View style={styles.container}>
         
        <RNCamera
          ref={(ref) => {this.CameraScreen = ref;}}
          style={styles.cameraView}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          captureAudio={false}>
        
          {this.state.paintBrushIconPressed ?
            <RNSketchCanvas
              defaultStrokeIndex={0}
              defaultStrokeWidth={5}
              containerStyle={styles.sketchContainer}
              canvasStyle={styles.sketchCanvas}
              onClosePressed={() => this.paintBrushPressed()}
              closeComponent={<View style={styles.close}><MaterialCommunityIcons name="window-close" size={40}/></View>}
              clearComponent={<View style={styles.trash}><Fontisto name="trash" size={35}/></View>}
              eraseComponent={<View style={styles.eraser}><MaterialCommunityIcons name="eraser" size={45} /></View>}
              strokeComponent={color => (<View style={[{ backgroundColor: color }, styles.strokeColorButton]}/>)}
              saveComponent={<View style={styles.save}><Entypo name="save" size={40} style={styles.facebookIcon}/></View>}
              savePreference={() => {return {folder: null, filename: String(Math.ceil(Math.random() * 100000000)),transparent: true, includeImage: true, imageType: 'jpg'}}}
              onSketchSaved={( success, path)=> this.captureSketch(success, path)} 
              strokeSelectedComponent={(color) => {return (<View style={[{backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]}/>)}}
              strokeWidthComponent={(w) => {return (<View style={styles.strokeWidthButton}><View  style={{backgroundColor: 'white', marginHorizontal: 2.5,width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2 }} /></View>)}}
            />
            : 
            <View>
              <TouchableOpacity style={styles.mapMarkerIcon}>
                <Fontisto name="map-marker-alt" size={42} onPress={() => this.jumpToMapScreen()}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.paintBrush} onPress={() => this.paintBrushPressed()}>
                <FontAwesome5 name="paint-brush" size={50}/>
              </TouchableOpacity>
            </View>
            }
        </RNCamera>
        {this.state.imageSaved && this.state.imageURI !== '' ?  <Image style={styles.savedImage} source={{uri: this.state.imageURI}}/> : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
      email: state.loginReducer.email
  }
}

export default connect(mapStateToProps) (CameraScreen);