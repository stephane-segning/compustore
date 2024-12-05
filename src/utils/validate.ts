import { z } from 'zod';

// validation function for the created prducts 
export const productSchema = z.object({
  id: z.string({ required_error: 'ID is required' }).min(1, { message: 'ID is required' }),
  name: z.string({ required_error: 'Name is required' }).min(1, { message: 'Name is required' }),
  prices: z
    .array(z.number(), { required_error: 'Prices are required' })
    .nonempty({ message: 'Prices are required' }),
  images: z
    .array(z.string(), { required_error: 'Images are required' })
    .nonempty({ message: 'Images are required' }),
  description: z
    .string({ required_error: 'Description is required' })
    .min(1, { message: 'Description must not be empty' }),  // Ensuring description is not empty
});

export const validateProductData = (data: unknown) => productSchema.safeParse(data);
