import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/Theame';

const styles = StyleSheet.create({
  videoCard: {
    marginTop: 3,
    marginBottom: 30,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  timeContainer: {
    backgroundColor: COLORS.black,
    height: 30,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    position: 'absolute',
    right: 2,
    bottom: 5,
  },
  timeContainer3: {
    backgroundColor: COLORS.black,
    height: 30,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    position: 'absolute',
    left: 2,
    top: 5,
  },
  timeContainer4: {
    backgroundColor: COLORS.black,
    height: 30,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    position: 'absolute',
    right: 2,
    top: 5,
  },
  time: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    resizeMode: 'stretch',
    borderColor: COLORS.primary,
  },
  titleRow: {
    flexDirection: 'row',
    padding: 10,
  },
  midleContainer: {
    marginHorizontal: 10,
    flex: 1,
  },
  title: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
  },
  subtitle: {
    color: 'grey',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default styles;
