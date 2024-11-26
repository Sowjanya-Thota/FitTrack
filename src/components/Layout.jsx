// src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentContainer = styled.main`
  flex: 1;
  padding: 20px;
`;

function Layout() {
  return (
    <LayoutContainer>
      <Navbar />
      <ContentContainer>
        <Outlet /> {/* This is where routed components will be rendered */}
      </ContentContainer>
      <Footer />
    </LayoutContainer>
  );
}

export default Layout;
