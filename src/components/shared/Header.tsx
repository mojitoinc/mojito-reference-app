import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

import { Button } from "@components";
import { config, strings, images } from "@constants";
import { useMojitoMutation, useLazyMojito, useFetchAfterAuth } from "@hooks";
import { EMojitoMutations, EMojitoQueries } from "@state";

const Container = styled.nav(
  ({ theme }) => `
  align-items: center;
  background-color: ${theme.colors.background};
  display: flex;
  height: 82px;
  justify-content: space-between;
  padding: 0 48px;

  ${theme.down(theme.breakpoints.md)} {
    height: 50px;
    padding: 0 16px;
  }
`
);

const LogoLink = styled.a(
  ({ theme }) => `
  display: flex;

  ${theme.down(theme.breakpoints.md)} {
    &:first-child {
      height: 24px !important;
      width: 142px !important;
    }
  }
`
);

const DivButton = styled.div(
  ({ theme }) => `
  ${theme.down(theme.breakpoints.md)} {
    & button {
      font-size: 16px;
      min-height: 35px;
      padding: 0 28px;
    }
  }
`
);

export const Header = () => {
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
  const router = useRouter();

  const [updateUserSettings] = useMojitoMutation<{
    userOrgId: string;
    username: string;
    avatar: string;
  }>(EMojitoMutations.updateUserOrgSettings);

  const [getData, { data: profile }] = useLazyMojito(EMojitoQueries.profile, {
    variables: {
      organizationID: config.ORGANIZATION_ID,
    },
  });

  useFetchAfterAuth(getData);

  useEffect(() => {
    if (
      isAuthenticated &&
      profile &&
      profile.me.userOrgs[0]?.id &&
      !profile.me.userOrgs[0].username
    ) {
      updateUserSettings({
        variables: {
          userOrgId: profile.me.userOrgs[0].id,
          avatar: user?.picture,
        },
      });
    }
  }, [
    isAuthenticated,
    profile,
    updateUserSettings,
    user?.picture,
  ]);

  const login = () => {
    loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
        origin: router.asPath,
      },
    });
  };

  return (
    <Container>
      <Link href="/" passHref>
        <LogoLink>
          <Image
            src={images.LOGO?.src}
            alt={images.LOGO?.alt}
            width={images.LOGO?.headerWidth}
            height={images.LOGO?.headerHeight}
          />
        </LogoLink>
      </Link>
      {!isLoading && (
        <>
          {isAuthenticated ? (
            <Link href="/profile">
              <a>
                <Image
                  src={images.PROFILE_ICON?.src}
                  alt={images.PROFILE_ICON?.alt}
                  width={images.PROFILE_ICON?.width}
                  height={images.PROFILE_ICON?.height}
                />
              </a>
            </Link>
          ) : (
            <DivButton>
              <Button onClick={login}>{strings.COMMON.LOGIN_BUTTON}</Button>
            </DivButton>
          )}
        </>
      )}
    </Container>
  );
};
