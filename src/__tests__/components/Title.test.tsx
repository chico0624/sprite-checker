import React from 'react';
import { render, screen } from '@testing-library/react';
import Title from '../../components/Title'

test.each([
  'タイトルA',
  'タイトルB',
  'タイトルC',
])('display %s',(title) => {
  render(<Title title={title}/>);
  const text = screen.getByText(title);
  expect(text).toBeInTheDocument();
})