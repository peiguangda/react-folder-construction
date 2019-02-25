import * as React from 'react';
import * as chai from 'chai';
import UserForm from '../../../../../src/modules/user/components/UserForm'
import { shallow } from 'enzyme';

const addUser = () => {
    return new Promise((resolve, reject) => {
      resolve({
        id: 1,
        username: 'hahhe',
        age: 18,
        comment: 'nothing'
      });
    });
}

const lang= {};


describe('<UserForm />', () => {
    it('should render class', () => {
        const wrapper = shallow(<UserForm onSubmit={addUser} lang={lang}/>);
        // chai.expect(wrapper.find('form')).to.have.length(1);
        console.log(wrapper);
    });
});
