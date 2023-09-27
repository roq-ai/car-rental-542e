interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['End User'],
  customerRoles: ['Guest'],
  tenantRoles: ['End User'],
  tenantName: 'Organization',
  applicationName: 'Car Rental',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Read vehicle information',
    'Read reservation details',
    'Read user profiles',
    'Read organization details',
  ],
  ownerAbilities: ['Manage user profile', 'Manage reservations', 'View vehicle information', 'Manage usage tracking'],
  getQuoteUrl: 'https://app.roq.ai/proposal/9f740ef9-686d-41cb-8e95-f5537c96aba6',
};
