import React from 'react'
import Dashboard from './Dashboard'
import Adapter from 'enzyme-adapter-react-16'
import {shallow,configure } from 'enzyme'

configure({ adapter: new Adapter() })



//Test to show that the sub componets are renderng properly
describe('<Dasboard />', () => {  
    it('should have Leads', () => {     
      const wrapper = shallow(<Dashboard/>)
      expect(wrapper.find('Leads')).toBeDefined()
    })
    it('should have Form', () => {   
        const wrapper = shallow(<Dashboard/>)     
        expect(wrapper.find('Form')).toBeDefined()
      })
  })