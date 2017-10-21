import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  ScrollView,
  TouchableOpacity,
  PanResponder,
  Dimensions,
  Platform,
  TouchableWithoutFeedback
} from "react-native";
import PhotoViewer from "./PhotoViewer";

const TouchableWithoutFeedbackForCompositeComponents = ({
  onPress,
  children
}) =>
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={{ flex: 1 }}>
      {children}
    </View>
  </TouchableWithoutFeedback>;

const Bold = ({ children }) =>
  <Text style={{ fontWeight: "bold" }}>
    {children}
  </Text>;

const RN_TOUCH_HISTORY = [
  {
    key: "2015_01",
    width: 800,
    height: 533,
    source: { uri: "http://i.imgur.com/cY01AWS.jpg", cache: "force-cache" },
    caption: (
      <Text>
        <Bold>January 2015 </Bold>
        -
        <Bold> Tom Occhino </Bold>
        and
        <Bold> Christopher Chedeau </Bold>
        introduce React Native at ReactJS Conf
      </Text>
    )
  },
  {
    key: "2015_03",
    width: 873,
    height: 531,
    source: { uri: "http://i.imgur.com/x6AHjN1.png", cache: "force-cache" },
    caption: (
      <Text>
        <Bold>March 2015 </Bold>
        - React Native is open sourced with gesture responder system implemented
        by
        <Bold> Jordan Walke</Bold>.
      </Text>
    )
  },
  {
    key: "2015_07",
    width: 1275,
    height: 718,
    source: { uri: "http://i.imgur.com/4VksZKV.png", cache: "force-cache" },
    caption: (
      <Text>
        <Bold>July 2015 </Bold> - <Bold>Spencer Ahrens </Bold>
        and <Bold> Christoper Chedeau </Bold> introduce the Animated library.
      </Text>
    )
  },
  {
    key: "2017_02",
    width: 873,
    height: 618,
    source: { uri: "http://i.imgur.com/1depCaU.png", cache: "force-cache" },
    caption: (
      <Text>
        <Bold>February 2017 </Bold> - <Bold> Janic Dupliss </Bold> and an
        industry-wide collaboration result in useNativeDriver, a main-thread
        optimization for the Animated library.
      </Text>
    )
  },
  {
    key: "2017_03",
    width: 1281,
    height: 716,
    source: { uri: "http://i.imgur.com/07X3KsH.png", cache: "force-cache" },
    caption: (
      <Text>
        <Bold>March 2017 </Bold> - <Bold> Tal Kol</Bold> announces React Native
        Interactable, a physics system for RN views on the UI thread.
      </Text>
    )
  },
  {
    key: "2017_06",
    width: 1280,
    height: 721,
    source: { uri: "http://i.imgur.com/iI9ZR25.png", cache: "force-cache" },
    caption: (
      <Text>
        <Bold>June 2017 </Bold> - <Bold> Krzysztof Magiera</Bold> introduces
        React Native Gesture Handler, a UI thread interaction system with
        compatibility with existing components.
      </Text>
    )
  }
];

class CaptionOverlay extends React.Component {
  render() {
    const { photo, onClose } = this.props;
    return (
      <View
        pointerEvents="box-none"
        style={[StyleSheet.absoluteFill, { backgroundColor: "transparent" }]}
      >
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
        <View style={styles.overlayCaptionView} pointerEvents="none">
          <Text style={styles.overlayCaption}>
            {photo.caption}
          </Text>
        </View>
      </View>
    );
  }
}

const Item = ({ item, onPhotoOpen }) =>
  <View style={styles.item}>
    <TouchableWithoutFeedbackForCompositeComponents
      onPress={() => onPhotoOpen(RN_TOUCH_HISTORY, item.key)}
    >
      <PhotoViewer.Photo style={{ width: 125, height: 125 }} photo={item} />
    </TouchableWithoutFeedbackForCompositeComponents>
    <Text style={styles.caption}>
      {item.caption}
    </Text>
  </View>;

class App extends React.Component {
  render() {
    return (
      <PhotoViewer
        renderOverlay={({ photo, onClose }) =>
          <CaptionOverlay photo={photo} onClose={onClose} />}
        renderContent={({ onPhotoOpen }) =>
          <ScrollView style={styles.container}>
            <Text
              style={{
                fontSize: 28,
                margin: 20,
                marginTop: Platform.OS === "android" ? 40 : 20
              }}
            >
              A History of React Native interaction systems
            </Text>
            <View
              style={{
                borderBottomWidth: StyleSheet.hairlineWidth,
                height: 1,
                alignSelf: "stretch"
              }}
            />
            {RN_TOUCH_HISTORY.map(historyItem =>
              <Item
                key={historyItem.key}
                item={historyItem}
                onPhotoOpen={onPhotoOpen}
              />
            )}
          </ScrollView>}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  item: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#333",
    alignItems: "center"
  },
  caption: {
    flex: 1
  },
  closeText: { color: "white", backgroundColor: "transparent" },
  closeButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: Platform.OS === "android" ? 40 : 20,
    left: 20,
    borderWidth: 1,
    borderColor: "white",
    padding: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "white",
    borderRadius: 5
  },
  overlayCaptionView: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row"
  },
  button: { flex: 1, alignItems: "center", justifyContent: "center" },
  overlayCaption: {
    margin: 20,
    alignSelf: "flex-end",
    color: "white",
    backgroundColor: "transparent",
    fontSize: 20,
    fontWeight: "600"
  }
});

module.exports = App;
module.exports = require("./Preso");
