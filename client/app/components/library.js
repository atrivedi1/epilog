import React, {
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import NavBar from './navBar';

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

class Library extends Component {
  constructor(props) {
      super(props);
      this.state = {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        loaded: false,
      };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
      fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
            loaded: true,
          });
        })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderStory}
          contentContainerStyle={styles.listView}
          style={styles.list}
        />
        <View style={styles.navBar}>
          <NavBar />
        </View>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading stories...
        </Text>
      </View>
    );
  }

  renderStory(story) {
    return (
      <View style={styles.storyContainer}>
        <Image
          source={{uri: story.posters.thumbnail}}
          style={styles.thumbnail}
        />
          <Text style={styles.title}>{story.title}</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  storyContainer: {
    justifyContent: 'center',
    padding: 5,
    margin: 5,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    width: 150,
    borderWidth: 1,
    borderColor: '#CCC'
  },
  textContainer: {
    flex: 1,
    marginBottom: 8,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  },
  thumbnail: {
    width: 64,
    height: 64
  },
  list: {
    flex: 11
  },
  listView: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  navBar: {
    flex: 1,
  }
});

module.exports = Library;