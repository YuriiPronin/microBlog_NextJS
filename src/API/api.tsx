// React
import React, { useEffect, useState } from 'react';

// Helpers
import { firestore } from '../helpers/firebase';
import { Publication } from '@/helpers/interface';

export const useMyPublicList = () => {
  const [publicList, setPublicList] = useState<Array<Publication>>([]);

  useEffect(() => {
    fetchPublicList();
  }, []);

  const fetchPublicList = async () => {
    try {
      const snapshot = await firestore.collection('publications').get();
      const publication = snapshot.docs.map((doc) => {
        const data = doc.data() as Publication;
        return { ...data, id: doc.id };
      });
      setPublicList(publication);
    } catch (error) {
      console.log('Помилка при отриманні даних про публікації з Firebase:', error);
    }
  };

  return { publicList, setPublicList, fetchPublicList };
};