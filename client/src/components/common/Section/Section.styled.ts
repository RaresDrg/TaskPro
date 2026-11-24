import styled from "styled-components";

const Section = styled.section`
  position: relative;
  isolation: isolate;
  padding: 50px 0;
  background: ${({ theme }) => {
    if (theme.value === "dark") return "#1f1f1f";
    if (theme.value === "light") return "#f6f6f7";
    if (theme.value === "violet") return "#ecedfd";
    return "linear-gradient(180deg, #c4c4c400 25%, #bedbb0 92.19%)";
  }};
  transition: var(--transition);
`;

export default Section;
