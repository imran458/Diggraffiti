import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    text: {
        fontSize: 18,
        padding: 7,
        color: 'black'
    },

    map: {
        position: 'absolute',
        top: '0%',
        height: '100%',
        width: '100%',
        zIndex: -1
    },

    flatList1: {
        width: '100%', 
        height: '100%',
        backgroundColor: 'transparent',
    },

    flatList2: {
        flexGrow: .5,
        width: '100%', 
        height: '100%',
        backgroundColor: 'transparent',
    },

    overlay: {
        position: 'absolute',
        bottom: 300,
        left: 120,
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },

    prediction: {
        backgroundColor: 'white',
        borderColor: '#ddd',
        position: 'relative'
    },

    divider: {
        width: "100%", 
        height: 1, 
        backgroundColor: "#ddd"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginTop: 0
      },
    
    modalView: {
        margin: 20,
        width: '80%',
        top: '18%',
        height: '45%',
        backgroundColor: "#e5e5e5",
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'absolute'
    },

    cameraIcon: {
        position: 'absolute', 
        top: '1%', 
        left: '3%'
    },

    renderedSketch: {
        width: '100%', 
        height: '100%', 
        position: 'absolute',
        top: '20%'
    },

    renderedSketchName: {
        position: 'absolute',
        top: '3%',
        alignSelf: 'center',
        fontWeight: 'bold'
    },

    closeModalIcon: {
        position: 'absolute',
        top: '3%',
        left: '3%'
    },

    unpressedLikeIcon: {
        position: 'absolute',
        top: '122.5%',
        left: '0%',
    },

    pressedLikeIcon: {
        position: 'absolute',
        top: '124.2%',
        left: '3.5%',
    },

    imageLikes: {
        position: 'absolute',
        top: '124.2%',
        left: '20%',
    }

});