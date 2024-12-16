import {useUser} from "@/hooks/useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Link, router} from "expo-router";
import {useState} from "react";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {Button, Divider, Menu} from "react-native-paper";

export default function Account() {
    const {email, logout} = useUser();
    const [menuOpen, setMenuOpen] = useState(false);

    const openMenu = () => setMenuOpen(true);
    const closeMenu = () => setMenuOpen(false);
    // const [, refetch] = useAxios(`${API_URL}/users/${email}`);

    const logOut = async () => {
        logout();
        await AsyncStorage.removeItem("refreshToken");
        await AsyncStorage.removeItem("token");
        router.push("/");
    };

    // useEffect(() => {
    //     refetch().catch((err) => console.error(err));
    // }, [refetch]);

    const getLabel = () => (
        <TouchableOpacity onPress={openMenu} style={styles.labelContainer}>
            <Image source={require("../assets/account.png")} style={styles.profilePicture} />
        </TouchableOpacity>
    );

    const renderUserDropdown = () => {
        return (
            <View style={styles.container}>
                <Menu
                    visible={menuOpen}
                    onDismiss={closeMenu}
                    anchor={getLabel()}
                    anchorPosition="top"
                    style={styles.menu}
                >
                    <Menu.Item
                        onPress={() => {
                            closeMenu();
                            router.push("/profile");
                        }}
                        title="Profile"
                    />
                    <Menu.Item
                        onPress={() => {
                            closeMenu();
                            console.log("Navigate to Settings");
                        }}
                        title="Settings"
                    />
                    <Divider />
                    <Menu.Item
                        onPress={() => {
                            setMenuOpen(false);
                            logOut();
                        }}
                        title="Sign out"
                    />
                </Menu>
            </View>
        );
    };

    return (
        <View>
            {email.length > 0 ? (
                renderUserDropdown()
            ) : (
                <Link href="/login" asChild>
                    <Button mode="contained">Sign in</Button>
                </Link>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    labelContainer: {
        padding: 5,
        backgroundColor: "#e7e7e7",
        borderRadius: 40
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333"
    },
    profilePicture: {
        width: 25,
        height: 25
    },
    menu: {
        position: "absolute",
        left: 280,
        top: 90
    }
});
