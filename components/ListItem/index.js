import ListItem from './ListItem';
import SelectableListItem from './SelectableListItem';
import CollapsibleListItem from './CollapsibleListItem';

ListItem.Selectable = SelectableListItem;
ListItem.Collapsible = CollapsibleListItem;

ListItem.subComponents = [
  SelectableListItem,
  CollapsibleListItem
];

export default ListItem;
