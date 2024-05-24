import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../styles/Layouts";

export const Dashboard = () => {
  return (
    <DashBoardStyled>
      <InnerLayout>Dashboard</InnerLayout>
    </DashBoardStyled>
  );
};

const DashBoardStyled = styled.div``;
