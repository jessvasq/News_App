const SaveArticle = async (article) => {

    const response = await fetch('http://localhost:8088/api/saveArticle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
    });

    if (response.ok) {
        console.log("article successfully saved")
    } else {
        console.log('There was an error processing your request.')
    };
    
    return (
        <View>
            <Text>{article.title}</Text>
            <Button title="Save" onPress={handleSave} />
        </View>
    );

}