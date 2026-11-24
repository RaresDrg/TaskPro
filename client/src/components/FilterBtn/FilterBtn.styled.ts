import styled from "styled-components";
import FilterBtn from "./FilterBtn";

const StyledFilterBtn = styled(FilterBtn)`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-color-dark);
  background-color: #f5f5f5;
  border: 0.5px solid #808080;
  border-radius: 20px;
  padding: 5px 10px;
  box-shadow: 0 4px 30px #0000001a;
  transition: var(--transition);

  &:hover,
  &:focus-visible {
    box-shadow: 0 1px 1px #0000001a;
    background-color: #bab9be;
  }

  & {
    > svg {
      width: 16px;
      height: 16px;
      fill: none;
      stroke: currentColor;
    }

    > span {
      font-weight: 500;
      font-size: 0.875rem;
      line-height: 1.5;
      letter-spacing: -0.02em;
      text-transform: capitalize;
    }
  }
`;

export default StyledFilterBtn;
