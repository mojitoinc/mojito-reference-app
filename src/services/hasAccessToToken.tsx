// TODO: write detailed implementation

const hasAccessToToken = (token: string): boolean => {
  if (token === "1234567890" || token === "1234567899") {
    return true;
  } else {
    return false;
  }
};

export default hasAccessToToken;
