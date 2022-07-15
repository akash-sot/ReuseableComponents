import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  height: 100vh;
  gap: 0.5rem;
  .sidebar-wrapper {
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
export const MenuFooter = styled.div`
  text-align: center;
  padding-bottom: 4.5rem;
  h5 {
    margin: 0;
    span {
      color: #dd2515;
    }
  }
`;
export const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h5 {
    color: #1890ff;
  }
`;
