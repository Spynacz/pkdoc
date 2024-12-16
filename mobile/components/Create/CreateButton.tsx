import {router} from "expo-router";
import {StyleSheet} from "react-native";
import {Button} from "react-native-paper";

export default function CreateButton() {
    return (
        <Button mode="contained" style={styles.button} onPress={() => router.push("/create")}>
            Add new
        </Button>
    );
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        right: 10,
        bottom: 60
    }
});
