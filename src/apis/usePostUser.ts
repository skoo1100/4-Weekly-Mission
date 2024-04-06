export const usePostUser = async (
  type: string,
  state: object,
  accessToken: string | null = null,
) => {
  try {
    if (accessToken) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${type}`, {
        method: 'POST',
        headers: {
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify(state),
      });
      const data = await response.json();
      return { response, data };
    } else {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${type}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(state),
      });
      const data = await response.json();
      return { response, data };
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
