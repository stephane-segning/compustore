import { TRPCReactProvider } from '@cps/trpc/react';
import Navbar  from '@cps/components/layout/navbar/navbar';
import Footer from '@cps/components/layout/footer/footer';

export default function Layout(props: { children: React.ReactNode }) {
    return <TRPCReactProvider>
        <Navbar />
      {props.children}
        <Footer />
    </TRPCReactProvider>;
}