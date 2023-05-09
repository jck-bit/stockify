export async function myFetch(url:RequestInfo, options?:any ) {
    const token = localStorage.getItem('token');
  
    if (token) {
      options = options || {};
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      }
    }
  
    const response:any = await fetch(url, options);
  
    if (response.status === 401 && 422) {
      localStorage.clear();
      window.location.href = '/login';
      return;

    } else if(response.status === 422) {
      const errors = await response.json();
      if(errors?.msg === "Not enough segments"){
        //clear the Local storage
        localStorage.clear();
        window.location.href = '/login';
      }
      return errors;
    }
      return response;
  }