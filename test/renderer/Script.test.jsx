import React from 'react';
import { shallow, mount } from 'enzyme';
import Script from '../../renderer/Script.jsx';
import sampleFile from '../lib/sampleFile.js';

describe('Script', () => {
    it('should render a file immediately as expected', () => {
        const component = mount(<Script shortcutsAsText={sampleFile} />);
        expect(component.find('.shortcut').length).toBe(2);
        expect(component.find('.hotkey-creator').length).toBe(6);
    });
});

