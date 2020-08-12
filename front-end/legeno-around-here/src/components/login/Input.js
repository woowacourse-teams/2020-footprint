
import React from "react";
import styled from "styled-components";

const InputStyle = styled.input`
  width: 320px;
  height: 40px;
  border: solid 1px #979797;
  background-color: #eeeeee;
  margin: 0 auto;
`;

const WrapperStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Input({ type, placeholder, value, onChange, check }) {
  return (
    <WrapperStyle>
      <InputStyle
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {check}
    </WrapperStyle>
  );
}

export default React.memo(Input);