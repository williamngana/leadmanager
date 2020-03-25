import React from 'react'
import {Leads} from './Leads'
import Adapter from 'enzyme-adapter-react-16'
import {shallow,configure } from 'enzyme'
import configureStore from 'redux-mock-store'


configure({ adapter: new Adapter() })

const Leadprops = {
    leads: [{
        first_name: 'Will',
        last_name: 'Ngana',
        email: 'www@ww.ca',
        notes: 'No',  
        contacted: false,      
    }],
    getLeads: () => {
      console.log('test')
    }
  }



//Test to show that the sub componets are renderng properly
describe('<Leads />', () => {  
    it('should have Lead', () => {     
      const wrapper = shallow(<Leads {...Leadprops}/>)
      expect(wrapper.find('Lead')).toBeDefined()
    })
  })