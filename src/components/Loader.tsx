import React from "react";
import {StyleSheet, View, Modal, ActivityIndicator} from "react-native";
import {COLORS} from "../styles";
import {wh} from "../helpers";
import { useLoadingState } from "../../store";

const Loader = () => {
    const loading = useLoadingState(state => state.loading)

    return(
        <Modal transparent={true} animationType={'none'} visible={loading}>
            <View style={styles.modalBackground}>
                <View style={styles.indicatorWrapper}>
                    <ActivityIndicator animating={loading} size={"large"} color={COLORS.secondary}/>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground:{
        flex:1,
        alignItems:"center",
        justifyContent:"space-around",
        backgroundColor:"rgba(0,0,0,0.5)"
    },
    indicatorWrapper:{
        height:wh(.2),
        width:wh(.2),
        borderRadius:wh(.05),
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    }
})

export default Loader;