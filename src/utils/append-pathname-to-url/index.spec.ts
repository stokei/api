import { appendPathnameToURL } from '.';

describe('appendPathnameToURL', () => {
  it('should append pathname to url', () => {
    const response = 'https://google.com/mypathname';

    expect(appendPathnameToURL('https://google.com', 'mypathname')).toBe(
      response
    );
    expect(appendPathnameToURL('https://google.com/', 'mypathname')).toBe(
      response
    );
    expect(appendPathnameToURL('https://google.com', '/mypathname')).toBe(
      response
    );
    expect(appendPathnameToURL('https://google.com/', '/mypathname')).toBe(
      response
    );
  });
});
