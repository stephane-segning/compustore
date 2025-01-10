'use client';

import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

const AdminApp = dynamic(() => import('@cps/components/admin'), { ssr: false });

const AdminPage: NextPage = () => {
  const session = useSession();
  const router = useRouter();

  const whatToDo = useMemo((): 'login' | 'home' | 'admin' | void => {
    if (session.status === 'authenticated') {
      const role = session.data.user.role;
      if (role !== 'ADMIN') {
        return 'home';
      }

      return 'admin';
    }
    if (session.status === 'unauthenticated') {
      return 'login';
    }
  }, [session.status]);

  useEffect(() => {
    switch (whatToDo) {
      case 'login':
        router.push('/api/auth/signin');
        break;
      case 'home':
        router.push('/');
        break;
      case 'admin':
        break;
    }
  }, [session.status]);

  return whatToDo === 'admin' ? <AdminApp /> : null;
};

export default AdminPage;
