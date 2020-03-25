import React from 'react'
import {Form} from './Form'
import Adapter from 'enzyme-adapter-react-16'
import {shallow,configure } from 'enzyme'
import configureStore from 'redux-mock-store'


configure({ adapter: new Adapter() })

const Formprops = {
    lead:{
        first_name: 'Will',
        last_name: 'Ngana',
        email: 'www@ww.ca',
        notes: 'No',  
        contacted: false,      
    },
    addLead: () => {
        console.log('test')
      },
  }



//Test to show that the sub componets are renderng properly
describe('<From />', () => {  
    it('should have list he From prop in an accordion', () => {     
      const wrapper = shallow(<From {...Fromprops}/>)
      expect(wrapper.find('h1')).text('Add Leads')
    })
  })