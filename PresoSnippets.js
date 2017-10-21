const transformSnippet = `
const SharedElement => ({...a}) => (
  <Animated.View
    pointerEvents="none"
    style={{
      position: "absolute",
      width: openImageMeasurements.width,
      height: openImageMeasurements.height,
      left: openImageMeasurements.x,
      top: openImageMeasurements.y,
      overflow: "hidden",
      backgroundColor: "transparent",
      opacity: transitionProgress.interpolate({
        inputRange: SHARED_OPACITY_RANGE,
        outputRange: [0, 1, 1, 0]
      }),
      transform: [
        {
          translateX: transitionProgress.interpolate({
            inputRange: MOVEMENT_RANGE,
            outputRange: [openingInitTranslateX, 0]
          })
        },
        {
          translateY
        },
        {
          scale: transitionProgress.interpolate({
            inputRange: MOVEMENT_RANGE,
            outputRange: [openingInitScale, 1]
          })
        },

        {
          scaleX: transitionProgress.interpolate({
            inputRange: MOVEMENT_RANGE,
            outputRange: [inlineAspectX, 1]
          })
        },
        {
          scaleY: transitionProgress.interpolate({
            inputRange: MOVEMENT_RANGE,
            outputRange: [inlineAspectY, 1]
          })
        }
      ]
    }}
  >
    <Animated.Image
      source={photo.source}
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "transparent",
        transform: [
          {
            scaleX: transitionProgress.interpolate({
              inputRange: MOVEMENT_RANGE,
              outputRange: [1 / inlineAspectX, 1]
            })
          },
          {
            scaleY: transitionProgress.interpolate({
              inputRange: MOVEMENT_RANGE,
              outputRange: [1 / inlineAspectY, 1]
            })
          }
        ]
      }}
    />
  </Animated.View>
);
`;

const transformMathSnippet = `
let openingInitScale = 0;
let openingInitTranslateX = 0;
let openingInitTranslateY = 0;
let inlineAspectX = 1;
let inlineAspectY = 1;
if (inlineImageMeasurements && openImageMeasurements) {
  const aspectRatio = photo.width / photo.height;
  const screenAspectRatio = width.__getValue() / height.__getValue();
  if (aspectRatio - screenAspectRatio > 0) {
    const maxDim = openImageMeasurements.width;
    const srcShortDim = inlineImageMeasurements.height;
    const srcMaxDim = srcShortDim * aspectRatio;
    openingInitScale = srcMaxDim / maxDim;
    inlineAspectX =
      inlineImageMeasurements.width /
      inlineImageMeasurements.height /
      aspectRatio;
    inlineAspectY = aspectRatio;
  } else {
    const maxDim = openImageMeasurements.height;
    const srcShortDim = inlineImageMeasurements.width;
    const srcMaxDim = srcShortDim / aspectRatio;
    openingInitScale = srcMaxDim / maxDim;
    inlineAspectX = 1 / aspectRatio;
    inlineAspectY =
      aspectRatio *
      inlineImageMeasurements.height /
      inlineImageMeasurements.width;
  }
  const translateInitY =
    inlineImageMeasurements.y + inlineImageMeasurements.height / 2;
  const translateDestY =
    openImageMeasurements.y + openImageMeasurements.height / 2;
  openingInitTranslateY = translateInitY - translateDestY;
  const translateInitX =
    inlineImageMeasurements.x + inlineImageMeasurements.width / 2;
  const translateDestX =
    openImageMeasurements.x + openImageMeasurements.width / 2;
  openingInitTranslateX = translateInitX - translateDestX;
}
`;

const scrollEventSnippet = `

class ScrollEffects extends Component {
  scrollY = new Animated.Value(0);
  render() {
    return (
      <Animated.ScrollView
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: this.scrollY}}}
        ], {useNativeDriver: true})}
        scrollEventThrottle={1}>
        <Animated.View style={{
          transform: [
            {translateY: this.scrollY}
          ]
        }} />
      </Animated.ScrollView>
    );
  }
}

`;

module.exports = {
  scrollEventSnippet,
  transformSnippet,
  transformMathSnippet
};
