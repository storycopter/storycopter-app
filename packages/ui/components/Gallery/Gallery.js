import React, { Component } from 'react';
import styled from 'styled-components';
import {} from 'prop-types';
import { withTheme } from '@material-ui/styles';

const Element = styled(({ ...props }) => <section {...props} />)``;

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = { edit: null };
    this.enterEditMode = this.enterEditMode.bind(this);
  }

  enterEditMode(node) {
    this.setState({ edit: node });
  }

  render() {
    const {} = this.props;

    // console.group('Gallery.js');
    // console.log(this.props);
    // console.groupEnd();

    return <Element>Hello</Element>;
  }
}

export default withTheme(Gallery);

Gallery.propTypes = {};
Gallery.defaultProps = {};
