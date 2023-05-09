export async function myFetch(url:RequestInfo, options?:any ) {
    const token = localStorage.getItem('token');
  
    if (token) {
      options = options || {};
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  
    const response = await fetch(url, options);
  
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return;
    }
  
    return response;
  }