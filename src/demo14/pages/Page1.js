import React from 'react';

export default (props) => {
  return (
    <div>
      page1
      <button onClick={e => {
        props.history.push({
          pathname: '/2',
          state: {
            data: 'test',
          },
        })
      }}>to page2</button>
    </div>
  );
};
