import React from 'react'
import {Lead} from './Lead'
import Adapter from 'enzyme-adapter-react-16'
import {shallow,configure } from 'enzyme'
import configureStore from 'redux-mock-store'


configure({ adapter: new Adapter() })

const Leadprops = {
    lead:{
        id: 1,
        first_name: 'Will',
        last_name: 'Ngana',
        email: 'www@ww.ca',
        notes: 'No',  
        contacted: false,      
    },
    deleteLead: () => {
        console.log('test')
      },
    updateLead: () => {
      console.log('test')
    }
  }



//Test to show that the sub componets are renderng properly
describe('<Lead />', () => {  
    it('should have list he lead prop in an accordion', () => {     
      const wrapper = shallow(<Lead {...Leadprops}/>)
      expect(wrapper.find('Accordion')).toBeDefined()
    })
  })