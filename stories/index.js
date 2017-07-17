import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import PointInput from '../src/components/pointInput.cmp'

storiesOf('PointInput', module)
  .add('with text', () => <PointInput onClick={action('clicked')}></PointInput>);
