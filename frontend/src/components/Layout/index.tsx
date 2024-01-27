import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
