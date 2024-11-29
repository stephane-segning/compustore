import { withLifecycleCallbacks } from 'react-admin';
import { dataProvider as prismaDataProvider } from 'ra-data-simple-prisma';

export const dataProvider = withLifecycleCallbacks(prismaDataProvider('/api/admin'), []);