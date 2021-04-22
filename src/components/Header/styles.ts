import styled from 'styled-components';

export const Container = styled.header`
  height: 6.5rem;
  display: flex;
  align-items: center;
  padding: 2rem 4rem;
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};

  p {
    margin-left: 2rem;
    padding: 0.25rem 0 0.24rem 2rem;
    border-left: 1px solid ${({ theme }) => theme.colors.gray100};
  }

  span {
    margin-left: auto;
    text-transform: capitalize;
  }
`;


