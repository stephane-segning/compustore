import { TRPCReactProvider } from '@cps/trpc/react';

export default function BaseLayout(props: { children: React.ReactNode }) {
  return <TRPCReactProvider>{props.children}</TRPCReactProvider>;
}
