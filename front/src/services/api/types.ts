interface ApiMethod {
  url: string;
  params?: Record<string, unknown>;
}

interface PostMethod extends ApiMethod {
  body: object;
}

export type { ApiMethod, PostMethod };
