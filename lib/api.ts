//* =============================================
//*                 FETCHER                     =
//*==============================================
type FetcherProps =
  | {
      url: string;
      method: 'GET';
      body?: {};
      json?: boolean;
    }
  | {
      url: string;
      method: 'POST' | 'PUT' | 'DELETE';
      body: {};
      json?: boolean;
    };

export const fetcher = async ({
  url,
  method,
  body = undefined,
  json = true,
}: FetcherProps) => {
  const res = await fetch(url, {
    method,
    ...(!!body && { body: JSON.stringify(body) }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('API error');
  }

  if (json) {
    const data = await res.json();
    return data.data;
  }
};

//* =============================================
//*                 REGISTER                    =
//*==============================================
export const register = (user: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}) => {
  return fetcher({
    url: '/api/register',
    method: 'POST',
    body: user,
    // json: false,
  });
};

//* =============================================
//*                 SIGN-IN                      =
//*==============================================
export const signin = (user: { email: string; password: string }) => {
  return fetcher({
    url: '/api/signin',
    method: 'POST',
    body: user,
    // json: false,
  });
};

//* =============================================
//*              CREATE PROJECT                 =
//*==============================================
