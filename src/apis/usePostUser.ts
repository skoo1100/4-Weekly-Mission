export const usePostUser = async (signType: string, signState: object) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${signType}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(signState),
    });

    return response.status;
  } catch (error: any) {
    throw new Error(error);
  }
};
