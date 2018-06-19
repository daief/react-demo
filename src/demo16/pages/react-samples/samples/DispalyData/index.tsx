import * as React from 'react';
import { IMemberEntity } from './modal';
import { fetchMembers } from './api';
import Item from './Item';

interface IState {
  members: IMemberEntity[];
  fetching: boolean;
}

export default class DisplayData extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      members: [],
      fetching: false,
    }
  }

  public componentDidMount() {
    this.setState({
      fetching: true,
    });

    fetchMembers()
      .then(members => {
        this.setState({
          members,
          fetching: false,
        });
      })
  }

  public render() {
    const { fetching, members } = this.state;
    return (
      fetching ? (
        <div>fetching...</div>
      ) : (
        <ul>
          {
            members.map(member => (
              <Item key={member.id} member={member} />
            ))
          }
        </ul>
      )
    );
  }
}
