import { useState, useEffect } from 'react';

import token from '../helpers/token';
import { ServiceType } from '../provider/MifProvider';
import { getUrl } from '../helpers/getUrl';
import { fetchGetAllDomains } from './fetchDomains';

export function useFetch(domain: string, server: string, serviceType: ServiceType) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const method = async () => {
      setLoading(true);
      
      try {
        const fetchedData = await fetchGetAllDomains([domain]);  // Await the promise resolution
        setData(fetchedData[0]);
      } catch (err) {
        setError(true);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    method();
  }, [domain, server]);

  return { loading, data, error };
}