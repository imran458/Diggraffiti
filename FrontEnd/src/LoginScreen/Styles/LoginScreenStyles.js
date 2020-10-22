import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#be0000',
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: 1
    },

    googleSignInButton: {
        width: '62%', 
        height: '5%'
    },

    facebookSignInButton: {
        width: '60%', 
        height: '4.5%',
        backgroundColor: '#151515'
    },

    signInWithFacebookText: {
        color: 'white',
        top: '15%',
        alignSelf: 'center',
        left: '20%',
        position: 'absolute',
        fontWeight: 'bold'
    },

    facebookIcon: {
        color: 'white',
        width: '50%'
    },

    wikitudeARTestButton:{
        position: 'absolute',
        bottom: '20%',
        alignSelf: 'center',
        backgroundColor: '#ADD8E6',
        width: '40%',
        height: '3%',
        borderWidth: 2,
        borderColor: '#ADD8E6'
    }
    
});