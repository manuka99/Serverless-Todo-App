const HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Origin": "*",
};

export interface Response {
  body: string;
  statusCode: number;
  headers: { [key: string]: string };
}

interface SuccessProps {
  message?: string;
  data?: Object;
}

interface ErrorProps {
  error: string;
  code?: number;
  data?: Object;
}

type ResponseFunction = (props: SuccessProps | ErrorProps) => Response;

export const APIGatewayResponse: {
  [key in "R200" | "R422" | "R400"]: ResponseFunction;
} = {
  R200: (successProps: SuccessProps): Response => {
    let _successProps = successProps || {};
    if (!_successProps.message) _successProps.message = "Success";
    return {
      statusCode: 200,
      body: JSON.stringify(_successProps),
      headers: HEADERS,
    };
  },
  R422: (errorProps: ErrorProps): Response => {
    return {
      statusCode: 422,
      body: JSON.stringify(errorProps),
      headers: HEADERS,
    };
  },
  R400: (errorProps: ErrorProps): Response => {
    return {
      statusCode: 400,
      body: JSON.stringify(errorProps),
      headers: HEADERS,
    };
  },
};
