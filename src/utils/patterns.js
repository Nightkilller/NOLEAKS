export const secretPatterns = [
  {
    name: 'AWS Access Key ID',
    regex: /\bAKIA[0-9A-Z]{16}\b/
  },
  {
    name: 'GitHub Token',
    regex: /\b(?:ghp|gho|ghu|ghs|ghr)_[a-zA-Z0-9]{36}\b/
  },
  {
    name: 'Stripe Live Key',
    regex: /\bsk_live_[0-9a-zA-Z]{24}\b/
  },
  {
    name: 'Stripe Test Key',
    regex: /\bsk_test_[0-9a-zA-Z]{24}\b/
  },
  {
    name: 'RSA Private Key',
    regex: /-----BEGIN RSA PRIVATE KEY-----/
  },
  {
    name: 'Google Cloud API Key',
    regex: /\bAIza[0-9A-Za-z\\-_]{35}\b/
  },
  {
    name: 'Slack Token',
    regex: /\bxox[baprs]-[0-9]{12}-[0-9]{12}-[a-zA-Z0-9]{24}\b/
  },
  {
    name: 'Generic High Entropy Secret',
    regex: /\b[A-Za-z0-9_]{40,}\b/
  }
];
