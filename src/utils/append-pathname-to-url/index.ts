const removeTextSlash = (text: string, from: 'START' | 'END') => {
  if (!text) {
    return text;
  }
  const textSplited = text.split('');
  const slashItem = textSplited[from === 'END' ? textSplited.length - 1 : 0];
  if (slashItem !== '/') {
    return text;
  }
  if (from === 'END') {
    const removeLastSlash = textSplited?.slice(0, textSplited?.length - 1);
    return removeLastSlash?.join('');
  }
  const removeFirstSlash = textSplited?.slice(1, textSplited?.length);
  return removeFirstSlash?.join('');
};

export const appendPathnameToURL = (url: string, pathname: string) => {
  return removeTextSlash(url, 'END') + '/' + removeTextSlash(pathname, 'START');
};
