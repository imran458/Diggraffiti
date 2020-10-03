import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../Styles/LoginScreenStyles.js';
import { LoginManager, AccessToken} from 'react-native-fbsdk'
import { GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class LoginScreen extends Component{
    constructor(props){
        super();
        this.state = {
            isSigninInProgress:false,
            userInfo:null,
            isLoggedIn: false
        }

        GoogleSignin.configure({
            scopes: [],
            webClientId: 'add yor webclient here',
            offlineAccess: true, 
            hostedDomain: '', 
            forceConsentPrompt: true,
            accountName: ''
        });
    }


    handleGoogleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('_____userinfo',userInfo)
            this.setState({ userInfo });
        } catch (error) {
            console.log(error)
        }
   }

   handleFacebookLogin = () => {
       console.log(this);
       this.setState({isLoggedIn: true});
        LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']).then(
            function (result) {
                if (result.isCancelled) {
                console.log('Login cancelled')
                } else {
                console.log('Sucessfully logged in with Facebook!');
                this.fetchFaceBookUserInfo();
                }
            },
            function (error) {
                console.log('Login fail with error: ' + error);
            }
        )
    }

    fetchFaceBookUserInfo(){
        AccessToken.getCurrentAccessToken().then((data) => {
            const { accessToken } = data;
            fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
            .then((response) => response.json())
            .then((json) => {
                const id = json.id
                const email = json.email
                const name = json.name
                let firstName = name.substr(0, name.indexOf(' ')); 
                let lastName = name.substr(name.indexOf(' ')+1);

                console.log("User Facebook Email: " + email);
                console.log("User Facebook First Name: " + firstName);
                console.log("User Facebook Last Name: " + lastName);
                console.log("this is this: " + this);
            })
            .catch(() => {
                reject('Error getting data from Facebook!');
            })})
        }

    jumpToCameraScreen () {
        console.log(this.state.isLoggedIn);
        if (this.state.isLoggedIn){
            this.props.navigation.navigate('CameraScreen');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.facebookSignInButton} onPress={() => {this.handleFacebookLogin()}}>
                    <Entypo name="facebook" size={30} style={styles.facebookIcon}/>
                    <Text style={styles.signInWithFacebookText}>Sign in with Facebook </Text>          
                </TouchableOpacity>

                <GoogleSigninButton
                    style={styles.googleSignInButton}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={()=>this.handleGoogleLogin()}
                    disabled={this.state.isSigninInProgress} 
                />

                <TouchableOpacity  onPress={() => this.jumpToCameraScreen()}>
                    <AntDesign name="camera" size={30} />       
                </TouchableOpacity>
            </View>
        );
    }
}
    