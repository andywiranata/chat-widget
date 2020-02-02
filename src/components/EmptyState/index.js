import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { imgChatWithUs } from '../../assets/index';

const Wrapper = styled.div`
    text-align: center;
    margin-top: 4%;
`;
const Text = styled.div`
    margin: 12px;
    font-size: 16px;
    font-weight: 500;
`;
const Button = styled.button`
  background-color: #00b23a;
  color: white;
  font-size: 16px;
  margin: 12px;
  padding: 8px 12px;
  border: none;
  border-radius: 2px;
  text-align: center;
  width: 50%;
`;

const EmptyState = ({ handleClickChatWithUs, loading })=> (
    <Wrapper>
        <img src={imgChatWithUs} width="50%" />
         <Text>Need some help ? chat with us.</Text>
        <Button onClick={handleClickChatWithUs} disabled={loading}>{ !loading ? 'Create ticket now!' : 'creating...'}</Button>
    </Wrapper>
)

EmptyState.propTypes = {
    handleClickChatWithUs: PropTypes.func,
    loading: PropTypes.bool
};
EmptyState.defaultProps = {
    handleClickChatWithUs: ()=>{},
    loading: false,

};
export default EmptyState;