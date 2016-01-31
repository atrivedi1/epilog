import React, {
  Component,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  ScrollView,
  PixelRatio,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import NavBar from './navBar';

class NewStory extends Component {

  render() {
    let { width, height } = Dimensions.get('window');
    const { asset, onBack } = this.props;
    const newStory = this.props.asset;
    var textInputs = {
      newStoryTitle: this.props.storyTitle
    };

    return (
      <View style={ styles.container }>

        <View style={ styles.content }>
          <Image
            source={{ uri: asset.node.image.uri }}
            style={ styles.thumbnail }
          />
        </View>

        <View style={ styles.textContainer }>
          <TextInput style={styles.textInput} value={textInputs.newStoryTitle}
            onChangeText={(text)=>textInputs.newStoryTitle = text} />
          <TextInput style={styles.textInput} placeholder='Description'
            onChangeText={(text)=>textInputs.newStoryDescription = text} />
          <TextInput style={styles.textInput} placeholder='Add friends to your story'
            onChangeText={(text)=>textInputs.newStoryCharacters = text} />
        </View>

        <View style={ styles.buttonContainer }>
          <TouchableHighlight onPress={onBack}>
            <Text style={ styles.button }>
              Cancel
            </Text>
          </TouchableHighlight>

          <Text style={ styles.button }>
            Submit
          </Text>
        </View>

        <View style={ styles.navBar }>
          <NavBar />
        </View>

      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'column',
    backgroundColor: 'grey'
  },
  content: {
    flex: 11,
    justifyContent: 'center',
  },
  navBar: {
    flex: 1
  },
  textContainer: {
    marginBottom: 20
  },
  textInput: {
    flexWrap: 'wrap',
    alignSelf: 'center',
    height: 30,
    borderRadius: 2,
    padding: 1,
    width: 350,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderColor: 'black',
    borderWidth: 1,
    flex: 4,
    textAlign: 'center'
  },
  thumbnail: {
    width: 320,
    height: 240,
    alignSelf: 'center'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginBottom: 18
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    width: 100,
    height: 30,
    alignSelf: 'center',
    textAlign: 'center',
    paddingTop: 7
  }
});

module.exports = NewStory
