import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  position: relative;

  main {
    flex: 1;
  }

  @media screen and (max-width: 1500px) {
    display: block;
  }
`;
