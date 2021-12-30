import React from 'react';

import { hex2rgb } from '../../lib/color'

test.each([
    { hex: "000000", rgb: [0, 0, 0] },
    { hex: "ff8040", rgb: [255, 128, 64] }
])('hex %s => rgb', ({ hex, rgb }) => {
    const result = hex2rgb(hex);
    expect(result).toEqual(expect.arrayContaining(rgb))
})