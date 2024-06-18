const baseURL = '/auth';

export const routesAuth = {
  login: baseURL + '/login',
  signUp: baseURL + '/signup',
  completeAccountConfiguration: ({ account }: { account: string }) =>
    baseURL + '/complete-account/' + account,
  forgotPassword: baseURL + '/password/forgot',
  changePassword: baseURL + '/password/change'
};
