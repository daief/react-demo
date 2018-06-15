import { connect } from 'react-redux';
import Link from '../Link';
import { setVisibilityFilter } from '../../../store/actions';

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    active: ownProps.filter === state.visibilityFilter,
  };
};

const mapDispatchToProps = (dispatch: Function, ownProps: any) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    },
  };
};

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

export default FilterLink;
