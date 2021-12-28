import React from 'react';
import { render, screen } from '@testing-library/react';
import Title from '../../components/Title'

test('title test', () => {
  render(<Title title='タイトルテスト'/>);
  const text = screen.getByText(/タイトルテスト/i);
  expect(text).toBeInTheDocument();
});
