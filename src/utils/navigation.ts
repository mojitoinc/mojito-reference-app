export const getRedirect = (path?: string, mojitoId?: string) => {
  return {
    redirect: {
      destination: mojitoId && path ? `/${path}/${mojitoId}` : "",
      permanent: false,
    },
  };
};
