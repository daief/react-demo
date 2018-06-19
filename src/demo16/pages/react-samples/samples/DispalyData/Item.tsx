import * as React from 'react';
import { IMemberEntity } from './modal';

interface ItemProps {
  member: IMemberEntity;
}

const Item: React.StatelessComponent<ItemProps> = (props) => {
  const {member} = props;
  return (
    <li style={liStyle}>
      <img src={member.avatar_url} style={avatarStyle} alt="avatar"/>
      <span>{member.login}</span>
    </li>
  );
};

export default Item;

const avatarStyle: React.CSSProperties = {
  width: 50,
  height: 50,
  margin: '0 5px',
};
const liStyle: React.CSSProperties = {
  height: 70,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
};