import { useState, useEffect } from 'react';

import token from '../helpers/token';
import { ServiceType } from '../provider/MifProvider';
import { getUrl } from '../helpers/getUrl';

export function useFetch(domain: string, server: string, serviceType: ServiceType) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log(`useEffect thrown. Domain: ${domain}, Server: ${server}`);

    const headers = {
      'Authorization': token 
    };

    fetch(getUrl(domain, serviceType), {headers})
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok. Status: ${res.status}. StatusText: ${res.statusText}`);
        }
        return res.json();
      })
      .then((res) => {
          setData(res)
          setLoading(false);
        })
      .catch((err) => {
        console.log(err)
        setError(true);
        setLoading(false);
      });
      
  }, [domain, server]);

  return { loading, data, error };
}