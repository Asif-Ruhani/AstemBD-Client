import axios from 'axios';

// Dedicated helper to save user info using HttpOnly session credentials
export const saveUserToDatabase = async (firebaseUser, extraData = {}) => {
  const payload = {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: extraData.fullName || firebaseUser.displayName || '',
    photoURL: firebaseUser.photoURL || '',
    targetExam: extraData.targetExam || 'General',
    providerId: firebaseUser.providerData[0]?.providerId || 'password',
    createdAt: new Date().toISOString(),
  };

  const response = await axios.post('https://astembd-server.onrender.com/users', payload, {
    withCredentials: true,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  return response.data;
};