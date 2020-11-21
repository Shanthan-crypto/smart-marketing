import { ActionSheet, Root } from "native-base";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";

import { SliderBox } from "react-native-image-slider-box";

//import axios from "axios"
var url = "http://http://127.0.0.1:5000/api";
const buttons = [
  "A choropleth map is a type of thematic map in which a set of pre-defined areas is colored or patterned in proportion to a statistical variable that represents an aggregate summary of a geographic characteristic within each area, such as population density or per-capita income.",
  "A pie chart is a circular statistical graphic, which is divided into slices to illustrate numerical proportion. In a pie chart, the arc length of each slice, is proportional to the quantity it represents. ",
  "A bar chart or bar graph is a chart or graph that presents categorical data with rectangular bars with heights or lengths proportional to the values that they represent. The bars can be plotted vertically or horizontally. A vertical bar chart is sometimes called a column chart.",
  "The silhouette plot displays a measure of how close each point in one cluster is to points in the neighboring clusters and thus provides a way to assess parameters like number of clusters visually.",
  "Word Clouds (also known as wordle, word collage or tag cloud) are visual representations of words that give greater prominence to words that appear more frequently. For Mentimeter Word Clouds, the words that are added most frequently by audience members using their smartphones. This type of visualization can help presenters to quickly collect data from their audience, highlight the most common answers and present the data in a way that everyone can understand.",
  "The principal components of a collection of points in a real p-space are a sequence of direction vectors, where the vector is the direction of a line that best fits the data while being orthogonal to the first vectors.",
  "The principal components of a collection of points in a real p-space are a sequence of direction vectors, where the vector is the direction of a line that best fits the data while being orthogonal to the first vectors.",
  "The principal components of a collection of points in a real p-space are a sequence of direction vectors, where the vector is the direction of a line that best fits the data while being orthogonal to the first vectors.",
  "The principal components of a collection of points in a real p-space are a sequence of direction vectors, where the vector is the direction of a line that best fits the data while being orthogonal to the first vectors.",
  "A radar chart is a graphical method of displaying multivariate data in the form of a two-dimensional chart of three or more quantitative variables represented on axes starting from the same point.",
];
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      images: [
        require("./images/1.png"),
        require("./images/2.png"),
        require("./images/3.png"),
        require("./images/4.png"),
        require("./images/5.png"),
        require("./images/6.png"),
        require("./images/7.png"),
        require("./images/8.png"),
        require("./images/9.png"),
        require("./images/10.png"),
      ],
    };
  }

  componentDidMount() {
    var that = this;
    // axios.getFetch=()=>{
    //     fetch(url).then((response)=>{
    //         console.log("succes fetch :",response)
    //         asyncMemory.store('./images').convert('.bytesIO').to('.png')
    //         asyncMemory.store('./images').fname('$.png').replace().start(1)
    //     }).catch((error)=>{
    //         console.log("fail fetch :",error)
    //     })
    // }
    let items = [
      { src: require("./images/1.png") },
      { src: require("./images/2.png") },
      { src: require("./images/3.png") },
      { src: require("./images/4.png") },
      { src: require("./images/5.png") },
      { src: require("./images/6.png") },
      { src: require("./images/7.png") },
      { src: require("./images/8.png") },
      { src: require("./images/9.png") },
      { src: require("./images/10.png") },
    ];
    that.setState({
      //Setting the data source
      dataSource: items,
    });
  }

  showActionSheet = (index) => {
    ActionSheet.show(
      {
        options: [buttons[index], "Ok"],
      },
      (buttonIndex) => {
        ActionSheet.hide();
      }
    );
  };

  render() {
    return (
      <Root>
        <View style={styles.container}>
          <SliderBox
            images={this.state.images}
            sliderBoxHeight={300}
            onCurrentImagePressed={(index) =>
              //console.warn(`image ${index} pressed`)
              this.showActionSheet(index)
            }
          />
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <View style={{ flex: 1, flexDirection: "column", margin: 10 }}>
                <Image style={styles.imageThumbnail} source={item.src} />
              </View>
            )}
            //Setting the number of column
            numColumns={2}
            keyExtractor={(item, index) => index}
          />
        </View>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 180,
    padding: 30,
  },
});

// import {Text, View} from "react-native"

// import ImageCarousell from 'react-native-image-carousell';
// import React from "react"

// export default class Example extends React.Component {
//   constructor(props) {
//     super(props);
//     // const dataSource = new ListView.DataSource({
//     //   rowHasChanged: (r1, r2) => r1 !== r2,
//     // });
//     this.state = {
//       dataSource:[
//         require('./images/1.png'),
//         require('./images/2.png'),
//         require('./images/3.png'),
//         require('./images/4.png'),
//         require('./images/5.png'),
//         require('./images/6.png'),
//         require('./images/7.png'),
//         require('./images/8.png'),
//         require('./images/9.png'),
//         require('./images/10.png'),
//       ],
//     };
//   }

//   render() {
//     return (
//       <View>
//         <ImageCarousell
//           dataSource={this.state.dataSource}
//         />
//       </View>
//     );
//   }
// }
