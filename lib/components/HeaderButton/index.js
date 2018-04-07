import HeaderButton from './Button';
import SaveButton from './SaveButton';
import CloseButton from './CloseButton';
import BackButton from './BackButton';

HeaderButton.subComponents = [
  SaveButton,
  CloseButton,
  BackButton
];

HeaderButton.Save = SaveButton;
HeaderButton.Close = CloseButton;
HeaderButton.Back = BackButton;

export default HeaderButton;
