/* eslint-disable react/prop-types */
import React from 'react';
import ProtoTypes from 'prop-types';
import { Wrapper, Children } from './styles';
import Header from '~/components/Header';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <Children>{children}</Children>
    </Wrapper>
  );
}

DefaultLayout.protoTypes = {
  children: ProtoTypes.element.isRequired,
};
