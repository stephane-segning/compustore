import Link from 'next/link';

import { auth } from '@cps/server/auth';
import { HydrateClient } from '@cps/trpc/server';

export default async function Home() {
  const session = await auth();
  return (
    <HydrateClient>
      <main>
        <div className='flex flex-col items-center justify-center gap-4'>
          <p className='text-center text-2xl'>
            {session && <span>Logged in as {session.user?.name}</span>}
          </p>
          <Link
            href={session ? '/api/auth/signout' : '/api/auth/signin'}
            className='rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20'
          >
            {session ? 'Sign out' : 'Sign in'}
          </Link>
          {session?.user?.role === 'ADMIN' && (
            <Link
              href='/admin'
              className='rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20'
            >
              To Admin
            </Link>
          )}
        </div>
      </main>
    </HydrateClient>
  );
}





//  Mocked Logic used for testing filter component
// import Link from 'next/link';

// import { auth } from '@cps/server/auth';
// import { HydrateClient } from '@cps/trpc/server';
// import { Filter } from '@cps/components/filter'; // Import the Filter component

// export default async function Home() {
//   const session = await auth();

//   return (
//     <HydrateClient>
//       <main>
//         <div className='flex flex-col items-center justify-center gap-4'>
//           <p className='text-center text-2xl'>
//             {session && <span>Logged in as {session.user?.name}</span>}
//           </p>
//           <Link
//             href={session ? '/api/auth/signout' : '/api/auth/signin'}
//             className='rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20'
//           >
//             {session ? 'Sign out' : 'Sign in'}
//           </Link>
//           {session?.user?.role === 'ADMIN' && (
//             <Link
//               href='/admin'
//               className='rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20'
//             >
//               To Admin
//             </Link>
//           )}
//         </div>

//         {/* Add the Filter component */}
//         <section className='mt-8'>
//           <Filter />
//         </section>
//       </main>
//     </HydrateClient>
//   );
// }
