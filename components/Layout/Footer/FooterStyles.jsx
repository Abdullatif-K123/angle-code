import styled from "styled-components";

export const Container = styled.div`
  height: 880px;
  width: 100%;
  background-color: rgba(20, 28, 58, 0.9);
`;
export const MidDiv = styled.div`
  height: 880px;
  width: 90%;
  margin: auto;
`;
export const UpperBox = styled.div`
  height: 180px;
  width: 90%;
  margin: auto;
  border-bottom: 1.5px solid white;

  svg {
    color: white;
    margin-top: 6em;
  }

  p {
    color: white;
    font-size: 17px;
    font-weight: 400;
    margin-top: 1em;
  }
`;
export const MidBox = styled.div`
  height: 500px;
  width: 90%;
  margin: auto;
  display: flex;

  div {
    width: 25%;
    height: 500px;
  }

  .head {
    color: white;
    font-size: 15px;
    margin-top: 2em;
  }

  p {
    color: #8da9b3;
    font-size: 14px;
    margin-top: 2em;
  }

  p:hover {
    color: white;
    cursor: pointer;
  }
`;
export const LowerBox = styled.div`
  height: 100px;
  width: 90%;
  border-top: 1px solid #8da9b3;
  margin: auto;
  display: flex;

  div {
    height: 90px;
    width: 25%;
    display: flex;
    margin-top: 1em;
  }

  div > div {
    margin-top: 1.5em;
    height: 60px;
  }

  #fb,
  #linkedin,
  #twitter,
  #youtube,
  #pd {
    color: white;
  }
  #fb:hover,
  #linkedin:hover,
  #twitter:hover,
  #youtube:hover {
    color: #1e1e9b;
  }

  .copyright {
    margin-left: 35em;
    width: 35%;
    color: #8da9b3;
    display: flex;
    font-size: 13px;
  }

  .copyright p {
    margin-top: 1.8em;
    margin-left: 1.7em;
  }

  img {
    margin-top: 0.7em;
  }
`;
