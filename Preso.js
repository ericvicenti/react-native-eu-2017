import React from "react";
import PropTypes from "prop-types";
import ReactNative, {
  Animated,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  BackHandler,
  Platform,
  StatusBar,
  AsyncStorage,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import PhotoViewer from "./PhotoViewer";
// import { Video } from "expo";
import { atomOneLight } from "react-syntax-highlighter/dist/styles";
import SyntaxHighlighter from "react-native-syntax-highlighter";

const CodeTag = ({ children }) => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white"
    }}
  >
    {children}
  </View>
);

class CodePage extends React.Component {
  render() {
    return (
      <View
        style={{
          ...SCREEN_SIZE,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <SyntaxHighlighter
          CodeTag={CodeTag}
          PreTag={CodeTag}
          fontSize={34}
          language="jsx"
          style={{ ...atomOneLight, background: "green" }}
        >
          {this.props.code}
        </SyntaxHighlighter>
      </View>
    );
  }
}

class ScrollingCodePage extends React.Component {
  render() {
    return (
      <View
        style={{
          ...SCREEN_SIZE,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <SyntaxHighlighter
          fontSize={34}
          language="jsx"
          style={{ ...atomOneLight, borderWidth: 0 }}
        >
          {this.props.code}
        </SyntaxHighlighter>
      </View>
    );
  }
}
class CharacterPage extends React.Component {
  render() {
    return (
      <View style={{ ...SCREEN_SIZE }}>
        <Image
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1024,
            height: 768
          }}
          resizeMode="cover"
          source={require("./desktop.png")}
        />
        <View
          style={{
            position: "absolute",
            height: 400,
            top: 100,
            left: 0,
            right: 0,
            alignItems: "center"
          }}
        >
          <Image
            style={{
              flex: 1
            }}
            source={this.props.source}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            height: 200,
            backgroundColor: "transparent"
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: TITLE_SIZE,
              fontFamily: "System",
              backgroundColor: "transparent",
              textAlign: "center"
            }}
          >
            {this.props.text}
          </Text>
        </View>
      </View>
    );
  }
}

class ImagePage extends React.Component {
  render() {
    return (
      <View
        style={{
          ...SCREEN_SIZE,
          overflow: "hidden"
        }}
      >
        <Image
          source={this.props.source}
          style={{
            backgroundColor: "white",
            resizeMode: "contain",
            width: 1024,
            height: 768,
            ...(this.props.crop === "dragon"
              ? {
                  width: 1500,
                  height: 650
                }
              : {})
          }}
        />
        {this.props.upperText &&
          <View
            style={{
              backgroundColor: "rgba(118,84,57,0.8)",
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              height: 100
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: TITLE_SIZE,
                fontFamily: "System",
                marginVertical: 30
              }}
            >
              {this.props.upperText}
            </Text>
          </View>}

        {this.props.lowerText &&
          <View
            style={{
              backgroundColor: "rgba(118,84,57,0.8)",
              position: "absolute",
              bottom: 0,
              right: 0,
              left: 0,
              height: 100
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: TITLE_SIZE,
                fontFamily: "System",
                marginVertical: 30
              }}
            >
              {this.props.lowerText}
            </Text>
          </View>}
      </View>
    );
  }
}

class ThreadScenePage extends React.Component {
  scrollY = new Animated.Value(0);
  render() {
    return (
      <View style={{ ...SCREEN_SIZE, overflow: "hidden" }}>
        <Image
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1024,
            height: 768
          }}
          resizeMode="cover"
          source={require("./desktop.png")}
        />
        <Image
          style={{
            width: 260,
            height: 700,
            right: 30,
            top: -40,
            position: "absolute"
          }}
          source={require("./phone.png")}
          resizeMode="contain"
        />
        <View
          style={{
            position: "absolute",
            backgroundColor: "rgb(240,240,240)",
            right: 65,
            top: 160,
            width: 186,
            height: 321
          }}
        >
          {this.props.phoneImage &&
            <Image
              style={{
                width: 186,
                height: 321,
                resizeMode: "contain",
                backgroundColor: "black"
              }}
              source={require("./samplephoto.jpg")}
            />}
        </View>
        <Animated.ScrollView
          pagingEnabled
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          {this.props.scenes.map((scene, index) => {
            return (
              <View style={{ ...SCREEN_SIZE }} key={index}>

                <Animated.View
                  style={{
                    position: "absolute",
                    height: 400,
                    top: 100,
                    left: 0,
                    right: 0,
                    flexDirection: "row",
                    alignItems: "center",
                    transform: [{ translateY: this.scrollY }]
                  }}
                >
                  <Image
                    style={{
                      flex: 16,
                      height: 400
                    }}
                    source={require("./js-gal.png")}
                    resizeMode="contain"
                  />
                  {!this.props.skipRNguy &&
                    <Image
                      style={{
                        flex: 5,
                        height: 400
                      }}
                      source={require("./rn-dude.png")}
                      resizeMode="contain"
                    />}
                  <Image
                    style={{
                      flex: 7,
                      height: 400
                    }}
                    source={require("./native-gal.png")}
                    resizeMode="contain"
                  />
                  <View
                    style={{
                      flex: 8
                    }}
                  />
                </Animated.View>

                {(scene.jsSays || scene.rnSays || scene.uiSays) &&
                  <Animated.View
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      opacity: this.scrollY.interpolate({
                        inputRange: [
                          SCREEN_HEIGHT * index,
                          SCREEN_HEIGHT * index + 60
                        ],
                        outputRange: [1, 0]
                      })
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        left: !this.props.skipRNguy
                          ? scene.jsSays ? 275 : scene.uiSays ? 620 : 445
                          : scene.uiSays ? 560 : 320,
                        bottom: 140,
                        height: 100,
                        width: 100,
                        backgroundColor: "white",
                        transform: [{ rotate: "45deg" }]
                      }}
                    />
                    <View
                      style={{
                        borderRadius: 20,
                        position: "absolute",
                        bottom: 50,
                        right: 50,
                        left: 50,
                        height: 150,
                        padding: 30,
                        backgroundColor: "white"
                      }}
                    >
                      <Text
                        style={{
                          color: "#333",
                          fontSize: 33,
                          backgroundColor: "transparent",
                          fontFamily: "System",
                          textAlign: "center"
                        }}
                      >
                        {scene.jsSays || scene.rnSays || scene.uiSays}
                      </Text>
                    </View>
                  </Animated.View>}
                {scene.greatFinger && GREAT_FINGER}
              </View>
            );
          })}
        </Animated.ScrollView>
        {this.props.greatFinger && GREAT_FINGER}
      </View>
    );
  }
}

const GREAT_FINGER = (
  <View
    style={{
      position: "absolute",
      right: 0,
      top: 0,
      width: 964,
      height: 2213,
      transform: [
        { translateX: 550 },
        { translateY: -550 },
        { rotateZ: "-35deg" },
        { scale: 0.4 }
      ]
    }}
  >
    <Image
      source={require("./finger.png")}
      style={{ width: 964, height: 2213 }}
    />
  </View>
);

const CharacterIntroPage = () => (
  <DeskPage
    items={[
      {
        text: "JS thread reads and executes your code",
        image: require("./js-gal.png")
      },
      {
        text: "UI/Main thread puts stuff on screen",
        image: require("./native-gal.png")
      }
    ]}
  />
);

class DeskPage extends React.Component {
  render() {
    return (
      <View style={{ ...SCREEN_SIZE }}>
        <Image
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1024,
            height: 768
          }}
          resizeMode="cover"
          source={require("./desktop.png")}
        />
        <ScrollView showsVerticalScrollIndicator={false} pagingEnabled>
          {this.props.items.map(item => (
            <View style={SCREEN_SIZE} key={item.text}>
              <View
                style={{
                  position: "absolute",
                  height: 400,
                  top: 100,
                  left: 0,
                  right: 0,
                  alignItems: "center"
                }}
              >
                <Image
                  style={{
                    flex: 1
                  }}
                  source={item.image}
                  resizeMode="contain"
                />
              </View>
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  left: 0,
                  height: 200,
                  backgroundColor: "transparent"
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: TITLE_SIZE,
                    backgroundColor: "transparent",
                    fontFamily: "System",
                    textAlign: "center"
                  }}
                >
                  {item.text}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const RNCharacterPage = ({ text }) => (
  <CharacterPage source={require("./rn-dude.png")} text={text} />
);

// class PhoneCharacterPage extends React.Component {
//   render() {
//     // return (
//     //   <Video
//     //     source={require("./photo-viewer-demo.mov")}
//     //     rate={1.0}
//     //     volume={0}
//     //     muted={true}
//     //     resizeMode="cover"
//     //     shouldPlay
//     //     isLooping
//     //     style={{ flex: 1 }}
//     //   />
//     );
//   }
// }

// class VideoPage extends React.Component {
//   render() {
//     return (
//       <Video
//         source={require("./photo-viewer-demo.mov")}
//         rate={1.0}
//         volume={0}
//         muted={true}
//         resizeMode="cover"
//         shouldPlay
//         isLooping
//         style={{ flex: 1 }}
//       />
//     );
//   }
// }

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

let lastLocation = null;

class PagerScrollView extends React.Component {
  _sv: ?ScrollView = null;
  componentDidMount() {
    AsyncStorage.getItem("page_index", (err, data) => {
      if (data) {
        setTimeout(() => {
          this._sv &&
            this._sv
              .getScrollResponder()
              .scrollTo({ x: SCREEN_WIDTH * Number(data) });
        }, 10);
        goBackToFirstScreen = () => {
          this._sv.getScrollResponder().scrollTo({ x: 0 });
        };
      }
    });
  }
  render() {
    return (
      <FlatList
        ref={sv => {
          this._sv = sv;
        }}
        getItemLayout={({ item }, index) => ({
          length: SCREEN_WIDTH,
          offset: index * SCREEN_WIDTH,
          index
        })}
        style={{ flex: 1 }}
        pagingEnabled
        keyExtractor={(item, index) => index}
        data={this.props.pages}
        renderItem={({ item }) => <View style={SCREEN_SIZE}>{item()}</View>}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={e => {
          const { x } = e.nativeEvent.contentOffset;
          if (x % SCREEN_WIDTH === 0) {
            const newLocation = x / SCREEN_WIDTH;
            if (newLocation !== lastLocation) {
              lastLocation = newLocation;
              AsyncStorage.setItem("page_index", "" + newLocation);
            }
          }
        }}
        scrollEventThrottle={64}
      />
    );
  }
}

let goBackToFirstScreen = () => {};
const TITLE_VIEW_STYLE = {
  padding: 30,
  ...SCREEN_SIZE,
  alignItems: "center",
  justifyContent: "center"
};

class TitlePage extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback
        onLongPress={() => {
          goBackToFirstScreen();
        }}
      >
        <View style={{ ...TITLE_VIEW_STYLE, ...SCREEN_SIZE }}>
          <Text
            style={{
              fontSize: TITLE_SIZE,
              color: TITLE_COLOR,
              textAlign: "center"
            }}
          >
            {this.props.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

// const TITLE_COLOR = "#A86715";
// const TITLE_COLOR = "#A88315";
const TITLE_COLOR = "#765438";

class CoverPage extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback onLongPress={resetEverything}>
        <View
          style={{
            padding: 30,
            ...SCREEN_SIZE,
            backgroundColor: TITLE_COLOR
          }}
        >
          <Text
            style={{
              marginTop: 180,
              color: "white",
              fontSize: TITLE_SIZE + 50,
              fontFamily: "System",
              textAlign: "center"
            }}
          >
            {this.props.title}
          </Text>
          <Text
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 100,
              height: 100,
              color: "white",
              fontWeight: "100",
              fontFamily: "System",
              fontSize: TITLE_SIZE + 30,
              textAlign: "center"
            }}
          >
            Eric Vicenti - Facebook
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const getExamplePhotos = key => [
  {
    key: "a" + key,
    width: 1500,
    height: 1000,
    // source: require("./fire.jpg")
    source: {
      uri: "https://images.unsplash.com/photo-1484732710474-fe08580a0fc0?dpr=0.800000011920929&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=",
      cache: "force-cache"
    }
  },
  {
    key: "b" + key,
    width: 1500,
    height: 996,
    source: {
      uri: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?dpr=0.800000011920929&auto=format&fit=crop&w=1500&h=996&q=80&cs=tinysrgb&crop=",
      cache: "force-cache"
    }
  },
  {
    key: "c" + key,
    width: 1500,
    height: 1000,
    source: {
      uri: "https://images.unsplash.com/photo-1496482475496-a91f31e0386c?dpr=0.800000011920929&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=",
      cache: "force-cache"
    }
  }
];

class MultiMessagePage extends React.Component {
  scrollY = new Animated.Value(0);
  render() {
    return (
      <Animated.ScrollView
        pagingEnabled
        style={{ ...SCREEN_SIZE }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {this.props.messages.map((message, index) => (
          <TouchableWithoutFeedback
            onLongPress={goBackToFirstScreen}
            key={index}
          >
            <View style={{ ...SCREEN_SIZE, ...TITLE_VIEW_STYLE }}>
              <Animated.Text
                style={{
                  fontSize: TITLE_SIZE,
                  color: TITLE_COLOR,
                  textAlign: "center",
                  transform: [
                    {
                      translateY: this.scrollY.interpolate({
                        inputRange: [
                          SCREEN_HEIGHT * index - SCREEN_HEIGHT,
                          SCREEN_HEIGHT * index,
                          SCREEN_HEIGHT * index + SCREEN_HEIGHT,
                          SCREEN_HEIGHT * index + SCREEN_HEIGHT + SCREEN_HEIGHT
                        ],
                        outputRange: [
                          0,
                          0,
                          SCREEN_HEIGHT - 100,
                          2 * SCREEN_HEIGHT - 200
                        ]
                      })
                    }
                  ]
                }}
              >
                {message}
              </Animated.Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </Animated.ScrollView>
    );
  }
}

const TITLE_SIZE = 48;
const SCREEN_SIZE = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT
};

class PhotoViewerPage extends React.Component {
  render() {
    const { onPhotoOpen, photos } = this.props;
    return (
      <View style={{ ...SCREEN_SIZE, justifyContent: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {photos.map(photo => (
            <TouchableWithoutFeedback
              key={photo.key}
              onPress={() => {
                onPhotoOpen(photos, photo.key);
              }}
            >
              <View
                style={{
                  width: 200,
                  height: 200,
                  margin: 20
                }}
              >
                <PhotoViewer.Photo
                  style={{ width: 200, height: 200 }}
                  photo={photo}
                />
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
    );
  }
}

// class MultiPage extends React.Component {
//   state = { msg: 0 };
//   render() {
//     return (
//       <TouchableWithoutFeedback
//         onPress={() => {
//           const msg = this.state.msg + 1 === this.props.messages.length
//             ? 0
//             : this.state.msg + 1;
//           this.setState({ msg });
//         }}
//       >
//         <View style={{ flex: 1 }}>
//           <TitlePage title={this.props.messages[this.state.msg]} />
//         </View>
//       </TouchableWithoutFeedback>
//     );
//   }
// }

class MultiPage extends React.Component {
  state = { msg: 0 };
  render() {
    return (
      <ScrollView pagingEnabled showsVerticalScrollIndicator={false}>
        {this.props.children}
      </ScrollView>
    );
  }
}

import {
  transformSnippet,
  scrollEventSnippet,
  transformMathSnippet
} from "./PresoSnippets.js";

class PhonePage extends React.Component {
  render() {
    return (
      <View style={{ ...SCREEN_SIZE, backgroundColor: "black" }}>
        <Image
          source={require("./desktop.png")}
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              ...SCREEN_SIZE
            }
          ]}
          resizeMode="cover"
        />
        <Image
          source={require("./iphone5s.png")}
          style={[
            {
              position: "absolute",
              top: 20,
              left: 330,
              width: 360,
              height: 680
            }
          ]}
          resizeMode="contain"
        />
        <View
          style={{
            position: "absolute",
            width: 280,
            height: 484,
            left: 373,
            top: 133,
            backgroundColor: "white"
          }}
        >
          {this.props.children}
        </View>
      </View>
    );
  }
}

class ButtonDemo extends React.Component {
  render() {
    return (
      <PhonePage>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 100
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              width: 200,
              height: 70,
              paddingTop: 20,
              alignItems: "center",
              borderRadius: 15
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 26 }}>
              Button
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </PhonePage>
    );
  }
}
let resetEverything = () => {};

class Preso extends React.Component {
  state = {
    key: 0
  };
  componentDidMount() {
    resetEverything = () => this.setState({ key: this.state.key + 1 });
  }
  render() {
    return (
      <PhotoViewer
        key={this.state.key}
        renderContent={({ onPhotoOpen }) => (
          <PagerScrollView
            pages={[
              () => (
                <CoverPage title="Practical hacks for delightful interactions" />
              ),
              () => (
                <MultiPage>
                  <ImagePage source={require("./demogif.gif")} />
                  <TitlePage title="Live demo!" />
                  <ImagePage source={require("./yodawg.jpg")} />
                  <PhotoViewerPage
                    onPhotoOpen={onPhotoOpen}
                    photos={getExamplePhotos("a")}
                  />
                </MultiPage>
              ),
              () => (
                <TitlePage title="Beautiful UI often relies on ugly hacks" />
              ),
              () => (
                <PhotoViewerPage
                  onPhotoOpen={onPhotoOpen}
                  photos={getExamplePhotos("az")}
                />
              ),
              () => (
                <TitlePage title="Three practical hacks you can use today" />
              ),
              () => (
                <MultiMessagePage
                  messages={[
                    "Our existing toolbox:",
                    "Animated System",
                    "Touch Responder System"
                  ]}
                />
              ),

              () => (
                <MultiPage>
                  <CodePage code="const opacity = new Animated.Value(0);" />
                  <CodePage code="<Animated.View style={{opacity}} />" />
                  <CodePage code="Animated.timing(opacity, {toValue: 1}).start();" />
                </MultiPage>
              ),
              () => <TitlePage title="Who does this work?" />,

              () => <CharacterIntroPage />,
              () => (
                <ThreadScenePage
                  skipRNguy
                  scenes={[
                    { jsSays: "Please create a view with opacity 0" },
                    { uiSays: "Done!" },
                    {
                      jsSays: "Then, change opacity to 0.01. Then change opacity to 0.02..."
                    }
                  ]}
                />
              ),

              () => <TitlePage title="1. Animate on the UI thread" />,

              () => (
                <ThreadScenePage
                  skipRNguy
                  scenes={[
                    { jsSays: "Please create a view with opacity 0" },
                    { uiSays: "Alright.. its up!" },
                    {
                      jsSays: "Now, animate the opacity to 1 on a linear curve for 500ms."
                    },
                    { uiSays: "No problem!" }
                  ]}
                />
              ),

              () => (
                <ImagePage
                  source={require("./firewin.png")}
                  upperText="useNativeDriver"
                />
              ),
              () => (
                <CodePage code="Animated.timing(v, {useNativeDriver: true,.." />
              ),

              () => (
                <MultiMessagePage
                  messages={[
                    "Supports opacity",
                    "Does not support flexbox",
                    'Does not support "position"',
                    "Does not support Image.resizeMode",
                    "Supports transforms"
                  ]}
                />
              ),

              () => (
                <RNCharacterPage text="RN thread (or shadow thread) does layout logic and other work" />
              ),

              () => (
                <ThreadScenePage
                  phoneImage
                  scenes={[
                    {
                      jsSays: "Create an Image with position and resizeMode.."
                    },
                    {
                      rnSays: "Create an Image at coordinates x, y, width, height"
                    },
                    {
                      uiSays: 'Ok, but I cannot animate "position" or resizeMode at 60fps..'
                    },
                    {
                      jsSays: "Instead, move the image down by 100 px on an ease over the next 500ms."
                    },
                    { uiSays: "Ok!" }
                  ]}
                />
              ),

              () => (
                <PhotoViewerPage
                  onPhotoOpen={onPhotoOpen}
                  photos={getExamplePhotos("b")}
                />
              ),

              () => <ScrollingCodePage code={transformSnippet} />,
              () => <ScrollingCodePage code={transformMathSnippet} />,

              () => <TitlePage title="1. Animate on the UI thread" />,

              () => (
                <ThreadScenePage
                  phoneImage
                  scenes={[{}, { greatFinger: true }]}
                />
              ),

              () => (
                <TitlePage title="Gesture Responder System, PanResponder" />
              ),
              () => (
                <ScrollingCodePage
                  code={`
onStartShouldSetResponder
onMoveShouldSetResponder
onResponderGrant
onResponderMove
onResponderRelease
onResponderTerminationRequest
onResponderTerminate
`}
                />
              ),

              () => <ButtonDemo />,

              () => (
                <ThreadScenePage
                  greatFinger
                  phoneImage
                  scenes={[
                    { uiSays: "A touch has started." },
                    {
                      jsSays: "Ok, I'll keep track of this with the responder system"
                    },
                    { uiSays: "The touch has moved down 2px." },
                    {
                      jsSays: "Translate the photo down by 2px.."
                    }
                  ]}
                />
              ),

              () => <TitlePage title="2. Work around interaction lifecycle" />,

              () => (
                <MultiMessagePage
                  messages={[
                    "Start of interaction",
                    "Provides a ~100ms chance to do work"
                  ]}
                />
              ),

              () => (
                <MultiMessagePage
                  messages={[
                    "Mid-interaction",
                    "Easy to spot frame drops during movement"
                  ]}
                />
              ),

              () => (
                <MultiMessagePage
                  messages={[
                    "Touch end",
                    "Needs to seamlessly begin animation"
                  ]}
                />
              ),

              () => (
                <ThreadScenePage
                  greatFinger
                  phoneImage
                  scenes={[
                    {},
                    { uiSays: "The touch has moved." },
                    {
                      jsSays: "Over the next 100ms, smoothly move the photo here."
                    }
                  ]}
                />
              ),

              () => (
                <MultiMessagePage
                  messages={[
                    "Allows for smooth motion..",
                    "with noticible latency"
                  ]}
                />
              ),
              () => <TitlePage title="2. Work around interaction lifecycle" />,
              () => (
                <MultiPage>
                  <TitlePage title="Utilize initial perception delay" />
                  <TitlePage title="Start animation work on press down" />
                  <TitlePage title="InteractionManager" />
                </MultiPage>
              ),
              () => <TitlePage title="2. Work around interaction lifecycle" />,

              () => (
                <PhotoViewerPage
                  onPhotoOpen={onPhotoOpen}
                  photos={getExamplePhotos("c")}
                />
              ),

              () => (
                <ThreadScenePage
                  greatFinger
                  phoneImage
                  scenes={[
                    {
                      jsSays: "As the user swipes, change these styles accordingly."
                    }
                  ]}
                />
              ),
              () => (
                <ImagePage
                  source={require("./rninteractable.png")}
                  upperText="RN Interactable"
                />
              ),

              () => (
                <ImagePage
                  source={require("./rngesturehandler.png")}
                  upperText="RN Gesture Handler"
                />
              ),

              () => (
                <MultiPage>
                  <TitlePage title="These are awesome solutions!" />
                  <TitlePage title="So, what's the hack?" />
                  <ImagePage source={require("./yodawg.jpg")} />
                </MultiPage>
              ),

              () => (
                <TitlePage title="3. Use ScrollView for gesture handling" />
              ),
              () => (
                <ThreadScenePage
                  phoneImage
                  greatFinger
                  scenes={[
                    {
                      jsSays: "As the scroll position changes, perform these interpolated transforms.."
                    }
                  ]}
                />
              ),

              () => <ScrollingCodePage code={scrollEventSnippet} />,

              () => (
                <PhotoViewerPage
                  onPhotoOpen={onPhotoOpen}
                  photos={getExamplePhotos("d")}
                />
              ),

              () => <ThreadScenePage scenes={[{}, { greatFinger: true }]} />,

              () => (
                <MultiMessagePage
                  messages={[
                    "Three Practical Hacks",
                    "1. Animate on the UI thread",
                    "2. Work around interaction lifecycle",
                    "3. Use ScrollView for gesture handling"
                  ]}
                />
              ),
              () => (
                <ImagePage source={require("./shame.jpg")} lowerText="Shame?" />
              ),
              () => (
                <ImagePage
                  source={require("./dragon.gif")}
                  crop="dragon"
                  lowerText="Own your hacks without shame!"
                />
              ),
              () => (
                <MultiMessagePage
                  messages={[
                    "Hacks are costly to developers",
                    "Hacks enable delightful interactions",
                    "Hacks help inform framework evolution"
                  ]}
                />
              )
            ]}
          />
        )}
      />
    );
  }
}

StatusBar.setHidden(true);

module.exports = Preso;
