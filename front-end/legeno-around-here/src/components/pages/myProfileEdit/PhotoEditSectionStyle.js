import makeStyles from '@material-ui/core/styles/makeStyles'
import { MAIN_COLOR } from '../../../constants/Color'

const useStyle = makeStyles({
  photo: (props) => ({
    width: '100px',
    height: '100px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '300px',
    backgroundImage: `url('${props.profilePhoto.url}')`,
    border: '1px solid' + MAIN_COLOR,
  }),
  photoEditSection: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '20px auto',
  },
  uploadPhoto: {
    opacity: 0,
    position: 'absolute',
    zIndex: -1,
    pointerEvents: 'none',
  },
  photoEditButton: {
    color: 'black',
  },
  usingDefaultPhotoButton: {
    color: '#888888',
  }
});

export default useStyle;
