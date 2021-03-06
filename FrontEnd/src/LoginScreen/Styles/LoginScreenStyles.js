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
        height: '7%',
        top: '-9%'
    },

    facebookSignInButton: {
        width: '60%', 
        height: '6%',
        backgroundColor: '#151515',
        top: '-10%'
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

    sketchButton: {
        backgroundColor: 'green',
        bottom: '20%',
        position: 'absolute',
        width: '20%',
        height: '4%'
    },

    sketchText: {
        color: 'white'
    },
    
    login: {
        paddingBottom: 30,
        fontWeight: 'bold',
        fontSize: 30,
        top: '-20%'
    }

});
