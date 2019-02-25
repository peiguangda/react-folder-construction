import * as React from 'react';
import * as chai from 'chai';
import { shallow } from 'enzyme';
import RowTable from '../../../../../src/modules/user/components/RowTable';


const data = {
    "id":2,
    "username": "User 02",
    "age": 18,
    "comment": "Nothing"
  };

const lang= {};
const countUpAge= jest.fn();
const deleteUser= jest.fn();

describe('<RowTable />', () => {
    it('should render an `.border-bottom`', () => {
        const wrapper = shallow(<RowTable item={data} lang={lang} countUpAge={countUpAge} deleteUser={deleteUser}/>);
        chai.expect(wrapper.find('.border-bottom')).to.have.length(1);
        chai.expect(wrapper.find('.text-center')).to.have.length(1);
    });
});
