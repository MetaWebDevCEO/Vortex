import { Amplify } from "aws-amplify";
import {
  confirmSignUp as amplifyConfirmSignUp,
  fetchAuthSession as amplifyFetchAuthSession,
  getCurrentUser as amplifyGetCurrentUser,
  signIn as amplifySignIn,
  signOut as amplifySignOut,
  signUp as amplifySignUp,
} from "aws-amplify/auth";
import { uploadData, getUrl, remove } from "aws-amplify/storage";
import { get, post } from "aws-amplify/api";

let isConfigured = false;

type AmplifyPublicEnv = {
  NEXT_PUBLIC_AWS_REGION?: string;
  NEXT_PUBLIC_COGNITO_USER_POOL_ID?: string;
  NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID?: string;
  NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID?: string;
  NEXT_PUBLIC_S3_BUCKET?: string;
  NEXT_PUBLIC_REST_API_ENDPOINT?: string;
  NEXT_PUBLIC_REST_API_REGION?: string;
};

function getPublicEnv(): AmplifyPublicEnv {
  return {
    NEXT_PUBLIC_AWS_REGION: process.env.NEXT_PUBLIC_AWS_REGION,
    NEXT_PUBLIC_COGNITO_USER_POOL_ID: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
    NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID,
    NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID,
    NEXT_PUBLIC_S3_BUCKET: process.env.NEXT_PUBLIC_S3_BUCKET,
    NEXT_PUBLIC_REST_API_ENDPOINT: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
    NEXT_PUBLIC_REST_API_REGION: process.env.NEXT_PUBLIC_REST_API_REGION,
  };
}

export function configureAmplify() {
  if (isConfigured) return;

  const env = getPublicEnv();
  const region = env.NEXT_PUBLIC_AWS_REGION;
  const userPoolId = env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;
  const userPoolClientId = env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID;

  if (!region || !userPoolId || !userPoolClientId) {
    return;
  }

  const identityPoolId = env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID;
  const s3Bucket = env.NEXT_PUBLIC_S3_BUCKET;
  const restApiEndpoint = env.NEXT_PUBLIC_REST_API_ENDPOINT;
  const restApiRegion = env.NEXT_PUBLIC_REST_API_REGION || region;

  const amplifyConfig = {
    Auth: {
      Cognito: {
        userPoolId,
        userPoolClientId,
        ...(identityPoolId ? { identityPoolId } : {}),
      },
    },
    ...(s3Bucket
      ? {
          Storage: {
            S3: {
              bucket: s3Bucket,
              region,
            },
          },
        }
      : {}),
    ...(restApiEndpoint
      ? {
          API: {
            REST: {
              core: {
                endpoint: restApiEndpoint,
                region: restApiRegion,
              },
            },
          },
        }
      : {}),
  };

  Amplify.configure(amplifyConfig, { ssr: true });

  isConfigured = true;
}

export async function signUpWithEmailPassword(params: {
  email: string;
  password: string;
}) {
  configureAmplify();
  return amplifySignUp({
    username: params.email,
    password: params.password,
    options: { userAttributes: { email: params.email } },
  });
}

export async function confirmEmailSignUp(params: {
  email: string;
  code: string;
}) {
  configureAmplify();
  return amplifyConfirmSignUp({ username: params.email, confirmationCode: params.code });
}

export async function signInWithEmailPassword(params: {
  email: string;
  password: string;
}) {
  configureAmplify();
  return amplifySignIn({ username: params.email, password: params.password });
}

export async function signOutCurrentUser() {
  configureAmplify();
  return amplifySignOut();
}

export async function getSignedInUser() {
  configureAmplify();
  return amplifyGetCurrentUser();
}

export async function getAuthSession() {
  configureAmplify();
  return amplifyFetchAuthSession();
}

export async function uploadToS3(params: {
  key: string;
  data: Blob | ArrayBuffer | ArrayBufferView | string;
  contentType?: string;
}) {
  configureAmplify();
  return uploadData({
    path: params.key,
    data: params.data,
    options: params.contentType ? { contentType: params.contentType } : undefined,
  }).result;
}

export async function getS3Url(key: string) {
  configureAmplify();
  const result = await getUrl({ path: key });
  return result.url;
}

export async function deleteFromS3(key: string) {
  configureAmplify();
  return remove({ path: key });
}

export async function apiGet(params: {
  path: string;
  queryParams?: Record<string, string>;
  headers?: Record<string, string>;
}) {
  configureAmplify();
  const operation = get({
    apiName: "core",
    path: params.path,
    options: {
      queryParams: params.queryParams,
      headers: params.headers,
    },
  });
  const response = await operation.response;
  return response;
}

export async function apiPost(params: {
  path: string;
  body?: unknown;
  headers?: Record<string, string>;
}) {
  configureAmplify();
  const operation = post({
    apiName: "core",
    path: params.path,
    options: {
      body: params.body,
      headers: params.headers,
    },
  });
  const response = await operation.response;
  return response;
}
