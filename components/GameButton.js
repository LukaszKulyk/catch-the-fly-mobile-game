import { StyleSheet, View, Button, Pressable, Text } from 'react-native';

export default function GameButton (props) {
    //const nav = props.navigation;

    const { title, onPress } = props;

    return (
        <View>
            <Pressable style={styles.navButton} onPress={onPress}>
                <Text style={styles.text}>{title}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    navButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 50,
        //boxShadow: 'inset, 0px 1px 0px, 0px, #caefab', 
        //background: 'linear-gradient(to bottom, #77d42a 5%, #5cb811 100%)',
        backgroundColor: '#77d42a',
        //
        shadowColor: "#000",
        shadowOffset: {
            width: -4,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
        //
        //border: '2px',
        borderRadius: 6,
        border: '1px solid #268a16',
        //display: 'inline-block',
        /*cursor: 'pointer',*/
        //paddingTop: 6,//'6px 24px',
        //paddingBottom: 6,
        //paddingRight: 24,
        //paddingLeft: 24,
        marginBottom: 10
        /*textDecoration: 'none',
        textShadow: '0px 1px 0px #aade7c'  */ 
    },
    text: {
        //alignItems: 'center',
        //justifyContent: 'center',
        color: '#306108',
        //fontFamily: 'Arial',
        fontSize: 15,
        fontWeight: 'bold',
    }
  });