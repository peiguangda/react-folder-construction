import * as React from 'react';
import * as chai from 'chai';
import { shallow } from 'enzyme';
import { UserPage } from '../../../../../src/modules/user/components/Page';

const api = {
    loadings: 0,
    error: {}
};
const lang= {};

const fetchUsers = () => {
  return new Promise((resolve, reject) => {
    resolve({
      id: 1,
      username: 'hahhe',
      age: 18,
      comment: 'nothing'
    });
  });
}
const addUser = jest.fn();
const countUpAge = jest.fn();
const deleteUser = jest.fn();

describe('<UserPage />', () => {
    it('renders UserPage', () => {
        const wrapper = shallow(<UserPage api={api} lang={lang} fetchUsers={fetchUsers} addUser={addUser} countUpAge={countUpAge} deleteUser={deleteUser}/>);
        chai.expect(wrapper.find('.border-secondary')).to.have.length(1);
        chai.expect(wrapper.find('.border-bottom')).to.have.length(1);
    });
});
