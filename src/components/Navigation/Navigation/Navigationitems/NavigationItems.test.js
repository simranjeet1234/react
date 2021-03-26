import React from 'react';
import {configure,shallow} from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import Navigationitems from './Navigationitems';
import Navigationitem from '../../Navigationitem/Navigationitem';


configure({adapter: new Adapter()});

describe('<NavigationItems/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Navigationitems/>);
    })
    it('should render two <NavigationItem/> elemts if not authenticated', () => {
        expect(wrapper.find(Navigationitem)).toHaveLength(2);
    });

    it('should render three <NavigationItem/> elemts if  authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(Navigationitem)).toHaveLength(3);
    });
   

});