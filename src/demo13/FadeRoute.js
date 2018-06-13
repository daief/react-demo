/**
 * 路由过渡
 * from: https://gist.github.com/mhaagens/61f88e3fbfddbe2c00708f3ebd099be4
 */

import React from 'react';
import { Route } from 'react-router-dom';
import { TransitionMotion, spring, presets } from 'react-motion';

const FadeRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      children={({ location, match }) => (
        <TransitionMotion
          willEnter={() => ({ opacity: 0, translateX: 24 })}
          willLeave={() => ({ opacity: spring(0, presets.out), translateX: spring(24)})}
          defaultStyles={[
            {
              key: location.pathname,
              style: { opacity: 0, translateX: 24},
              data: match
            },
          ]}
          styles={match ? [{
            key: location.pathname,
            style: { opacity: spring(1, presets.in), translateX: spring(0) },
            data: match
          }] : []}
        >
          {interpolatedStyles => (
            <div className="route" style={wrapStyle}>
              {interpolatedStyles.map(config => (
                <div
                  className="page"
                  key={config.key}
                  style={{
                    ...pageStyle,
                    opacity: `${config.style.opacity}`,
                    transform: `translateX(-${config.style.translateX}px)`,
                  }}
                >
                  <Component />
                </div>
              ))}
            </div>
          )}
        </TransitionMotion>
      )}
    />
  )
};

const wrapStyle = {
  position: 'relative',
};
const pageStyle = {
  position: 'absolute',
  top: 0,
  width: '100%',
}

export default FadeRoute;
