import React, { ReactNode } from 'react';
import { Container } from 'reactstrap';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-100">
      <Container className="d-flex justify-content-center align-items-center h-100">
        {children}
      </Container>
    </div>
  );
};

