import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@components";
import { config, strings, images } from "@constants";
import { useFetchAfterAuth } from "@hooks";
import {
  useProfileLazyQuery,
  useUpdateUserOrgSettingsMutation,
} from "@services";
import { ConnectWallet } from "./ConnectWallet";

const Container = styled.nav(
  ({ theme }) => `
  align-items: center;
  background-color: ${theme.colors.background};
  display: flex;
  justify-content: space-between;
  padding: 0 48px;

  ${theme.down(theme.breakpoints.md)} {
    padding: 0 16px;
  }
`
);

const LogoLink = styled.a(
  ({ theme }) => `
  display: flex;
  padding: 21px 0;

  ${theme.down(theme.breakpoints.md)} {
    padding: 15px 0;

    &:first-child {
      width: ${images.LOGO?.headerMobileWidth}px !important;
    }
  }
`
);

const DivButton = styled.div(
  ({ theme }) => `
  padding: 17px 0;

  ${theme.down(theme.breakpoints.md)} {
    padding: 8px 0;

    & button {
      font-size: 16px;
      min-height: 35px;
      padding: 0 28px;
    }
  }
`
);

const ProfileLink = styled.a(
  ({ theme }) => `
  padding: 28px 0;

  ${theme.down(theme.breakpoints.md)} {
    padding: 12px 0;
  }
`
);

export const Header = () => {
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
  const router = useRouter();

  const [updateUserSettings] = useUpdateUserOrgSettingsMutation();

  const [getData, { data: profile }] = useProfileLazyQuery({
    variables: {
      organizationID: config.ORGANIZATION_ID,
    },
  });

  useFetchAfterAuth(getData);

  useEffect(() => {
    if (
      isAuthenticated &&
      profile &&
      profile.me?.userOrgs[0]?.id &&
      !profile.me.userOrgs[0].username
    ) {
      updateUserSettings({
        variables: {
          userOrgId: profile.me.userOrgs[0].id,
          avatar: user?.picture,
        },
      });
    }
  }, [isAuthenticated, profile, updateUserSettings, user?.picture]);

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
            <Link href="/profile" passHref>
              <ProfileLink>
                <Image
                  src={images.PROFILE_ICON?.src}
                  alt={images.PROFILE_ICON?.alt}
                  width={images.PROFILE_ICON?.width}
                  height={images.PROFILE_ICON?.height}
                />
              </ProfileLink>
            </Link>
          ) : (
            <DivButton>
              {/* Wallet connect demo purpose remove the sign-in */}
              {/* <Button onClick={login}>{strings.COMMON.LOGIN_BUTTON}</Button> */}
            </DivButton>
          )}
        </>
      )}
      <ConnectWallet/>
    </Container>
  );
};
