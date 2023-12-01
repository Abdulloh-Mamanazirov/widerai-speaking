import React from "react";
import { styled } from "styled-components";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";

const NavbarWrapper = styled.div`
  width: 100%;
  background: #4c52ff;
`;

const Container = styled.div`
  max-width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const NavbarLogo = styled.div``;

const NavbarAccount = styled.div``;

const LogoIcon = styled.img``;

const items = [
  {
    label: "About",
    key: "0",
  },
  {
    label: "Settings",
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "Sign Out",
    key: "3",
  },
];

const AccountAvatar = styled(Space)`
  width: 40px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Navbar = () => {
  return (
    <NavbarWrapper>
      <Container>
        <NavbarLogo>
          <Link to={"/"}>
            <LogoIcon src="/white-logo.svg" width={200} />
          </Link>
        </NavbarLogo>

        <NavbarAccount>
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <AccountAvatar>
                <img src="/login-image.png" alt="account" />
              </AccountAvatar>
            </a>
          </Dropdown>
        </NavbarAccount>
      </Container>
    </NavbarWrapper>
  );
};

export default Navbar;
