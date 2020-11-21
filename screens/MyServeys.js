import * as DocumentPicker from "expo-document-picker";

import { Content, Root } from "native-base";
import { Icon, StyleSheet, Text, View } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import Colors from "../Colors";
import { FAB } from "react-native-paper";
import React from "react";

export default class MySurveys extends React.Component {
  constructor(props) {
    super(props);
    ShowFiles = this.ShowFiles.bind(this);
    this.state = {
      files: [],
      fileNames: [],
    };
  }

  componentDidMount = async () => {
    const fileDetails = await AsyncStorage.getItem("fileDetails");
    if (fileDetails != null) {
      files = JSON.parse(fileDetails);
      this.setState({ fileUri: files.fileUri, fileNames: files.fileNames });
      //alert(files.fileNames[0])
    }
  };

  _pickDocument = async () => {
    var { files, fileNames } = this.state;
    let result = await DocumentPicker.getDocumentAsync({});
    var fileExt = result.uri.toString();
    fileExt = fileExt.substring(fileExt.length - 3);
    alert(fileExt);
    if (fileExt != "csv" && fileExt != "xslx" && fileExt != "txt") {
      alert("Unsupported File Format");
    } else {
      files.push(result.uri);
      fileNames.push(result.name);
      let file = {
        fileUri: files,
        fileNames: fileNames,
      };
      await AsyncStorage.setItem("fileDetails", JSON.stringify(file));
      this.setState({ files, fileNames });
      console.log(result);
    }
  };

  ShowFiles = () => {
    const { fileNames } = this.state;
    return fileNames.map((currentFile, index) => {
      return (
        <View key={index}>
          <Text style={{ paddingVertical: 15, paddingLeft: 5 }}>
            {currentFile}
          </Text>
          <View style={{ height: 1, backgroundColor: "black" }}></View>
        </View>
      );
    });
  };

  render = () => {
    return (
      <Root>
        <FAB
          big
          icon="plus"
          color={Colors.white}
          style={styles.fab}
          onPress={this._pickDocument}
        />
        <ShowFiles />
        {/* <Content>
            <ShowFiles/>
        </Content> */}
      </Root>
    );
  };
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.themeColor,
    zIndex: 1,
  },
});
