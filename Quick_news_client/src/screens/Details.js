export default function Details() {
    return (
        <View>
            <Button
                title="Go to Profile"
                onPress={() =>
                    navigation.navigate('Profile')
                }/>
        </View>
    )
}