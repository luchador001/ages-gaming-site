/**
 * Web3Forms delivers the contact form submissions by email.
 *
 * 1. Go to https://web3forms.com, enter the destination inbox and confirm
 *    the verification email — Web3Forms will show/email you an Access Key.
 * 2. Paste that key below. It is safe to ship in client code: Web3Forms
 *    scopes it to the destination inbox and rate-limits/spam-filters on
 *    their end, it is not an email password or SMTP credential.
 * 3. To change the destination inbox later, generate a new key for the
 *    new address on web3forms.com and swap it in here — no other code
 *    needs to change.
 */
export const CONTACT_FORM_CONFIG = {
  web3FormsAccessKey: '1e71cd4f-af72-40bf-ac9c-fa25e6a30934',
  web3FormsEndpoint: 'https://api.web3forms.com/submit',
} as const;
