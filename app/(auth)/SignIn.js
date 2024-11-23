import React, { useState, useRef } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    StatusBar,
    TouchableOpacity,
    Text,
    Image,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import images from "../../constants/images";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";

const App = () => {
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const router = useRouter();
    const phoneInput = useRef(null);
    return (
        <>
            <StatusBar barStyle="light-content" />
            <View style={styles.container}>
                <Image
                    source={images.AppLogo}
                    style={{ height: 150, marginBottom: 200, 
                        width: 300, borderRadius: 20
                    }}
                    resizeMode="contain"
                />
                {/* {showMessage && (
            <View style={styles.message}>
              <Text>Value : {value}</Text>
              <Text>Formatted Value : {formattedValue}</Text>
              <Text>Valid : {valid ? "true" : "false"}</Text>
            </View>
          )} */}

                <PhoneInput
                    ref={phoneInput}
                    defaultValue={value}
                    defaultCode="IN"
                    layout="first"
                    onChangeText={(text) => {
                        setValue(text);
                    }}
                    style={{
                        width: "100%",
                        borderRadius: 10,
                        innerHeight: 50,
                    }}
                    containerStyle={{
                        borderRadius: 10,
                        width: "90%",
                        padding: 0,
                        margin: 0,
                        marginBottom: 10,

                    }}
                    onChangeFormattedText={(text) => {
                        setFormattedValue(text);
                    }}


                    withLightTheme
                    // withShadow
                    autoFocus
                />

                <View
                style={{
                    width: '90%',
                }}
                >
                {
                    showMessage && !valid && (
                        <Text style={{ color: "red", marginTop: 0, textAlign: 'left', display:'flex', justifyContent:'flex-start' }}>
                            Invalid Phone Number
                        </Text>
                    )
                }
                </View>

                <Button
                    mode="contained"
                    style={{ width: "90%", marginTop: 20, borderRadius: 10,
                        marginBottom: 50
                     }}
                    onPress={() => {
                        const checkValid = phoneInput.current?.isValidNumber(value);
                        if (checkValid) {
                            router.push({
                                pathname: '(auth)/VerifyOtp',
                                params: { phone: value },
                              });
                        }else{
                            setShowMessage(true);
                            setValid(checkValid ? checkValid : false);
                        }
                    }}
                >
                    Continue
                </Button>
                {/* <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const checkValid = phoneInput.current?.isValidNumber(value);
              setShowMessage(true);
              setValid(checkValid ? checkValid : false);
            }}
          >
            <Text>Check</Text>
          </TouchableOpacity> */}



            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 70
    },
    wrapper: {
        marginBottom: 100
    }
});


export default App;