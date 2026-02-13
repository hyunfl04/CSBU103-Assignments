
import { RegistrationData } from '../types';

/**
 * Simulates a backend API call to register a user.
 * In a real scenario, this would hit an Express/MongoDB endpoint.
 */
export const registerUser = async (data: RegistrationData): Promise<{ success: boolean; message: string }> => {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulating the backend logic mentioned in the prompt (validation and creation)
  // Check if "database" already has this user
  const mockExistingUsers = ['test@example.com', 'admin@system.com'];
  
  if (mockExistingUsers.includes(data.username.toLowerCase())) {
    throw new Error('User already exists in MongoDB instance.');
  }

  // Success case
  console.log('User created in mock database:', {
    username: data.username,
    createdAt: new Date().toISOString()
  });

  return {
    success: true,
    message: 'Account created successfully!'
  };
};
