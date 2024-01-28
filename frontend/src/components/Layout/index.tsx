import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flexGrow: 1, width: '100%', marginTop: '64px' }}>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
