import React from "react";
import styled from "@emotion/styled";
import { Link } from "gatsby";

const Navigation = styled.ul`
  display: flex;
  list-style: none;
  position: absolute;
  top: 24px;
  left: 24px;
`;

const NavigationItem = styled.li`
  font-weight: 500;

  & + & {
    margin-left: 16px;
  }

  a {
    color: #fff;
    text-decoration: none;

    &.active,
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Section = styled(Link)`
  color: #fff;
  text-decoration: ${(props) => console.log(props) && `underline`};
`;

export default () => (
  <Navigation>
    <NavigationItem>
      <Section activeClassName="active" to="/">
        Home
      </Section>
    </NavigationItem>
    <NavigationItem>
      <Section activeClassName="active" to="/private">
        One
      </Section>
    </NavigationItem>
    <NavigationItem>
      <Section activeClassName="active" to="/private/two">
        Two
      </Section>
    </NavigationItem>
  </Navigation>
);
