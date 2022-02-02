import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import styled from "styled-components";

import { Button, LotGridItem, Modal } from "@components";
import { config, images, strings } from "@constants";
import { useLazyMojito, useFetchAfterAuth, useMojitoMutation } from "@hooks";
import { EMojitoMutations, EMojitoQueries } from "@state";
import Content from "content.json";

const Main = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 92px 30px;
`;

const TopContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const User = styled.div(
  ({ theme }) => `
  border: ${theme.borders.medium(theme.colors.primary)};
  border-radius: ${theme.borderRadius.large};
  display: flex;
  flex-direction: column;
  max-width: 1114px;
  padding: 24px 27px 40px 42px;
  position: relative;
  width: 100%;

  ${theme.down(theme.breakpoints.md)} {
    align-items: center;
    flex-direction: column-reverse;
    padding: 24px 27px;
  }
`
);

const ImageWrapper = styled.div(
  ({ theme }) => `
  border-radius: 50%;
  height: 120px;
  overflow: hidden;
  position: absolute;
  left: 40px;
  top: -60px;

  ${theme.down(theme.breakpoints.md)} {
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 120px;
  }
`
);

const ButtonsContainer = styled.div(
  ({ theme }) => `
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;

  ${theme.down(theme.breakpoints.md)} {
    flex-direction: column;
    margin-top: 10px
  }
`
);

const Edit = styled.div(
  ({ theme }) => `
  margin-left: 17px;

  ${theme.down(theme.breakpoints.md)} {
    margin-top: 10px;
  }
`
);

const Info = styled.div(
  ({ theme }) => `
  ${theme.down(theme.breakpoints.md)} {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-top: 55px;
    margin-bottom: 15px;
  }
`
);

const Username = styled.h3(
  ({ theme }) => `
  color: ${theme.colors.primary};
  font: ${theme.fonts.h3("bold")};
  margin: 0 0 8px;
`
);

const UsernameInput = styled.input(
  ({ theme }) => `
  border: none;
  color: ${theme.colors.primary};
  font: ${theme.fonts.h3("bold")};
  margin: 0 0 8px;
`
);

const BiddingScore = styled.div(
  ({ theme }) => `
  align-items: center;
  background-color: ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.small};
  color: ${theme.colors.background};
  display: flex;
  font: ${theme.fonts.small()};
  height: 24px;
  padding: 0 8px;
  width: fit-content;
`
);

const Score = styled.div`
  font-weight: bold;
`;

const Bids = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 76px 0;
  text-align: center;
`;

const BidsTitle = styled.h3(
  ({ theme }) => `
  color: ${theme.colors.primary};
  font: ${theme.fonts.h3("bold")};
  margin-bottom: 50px;
`
);

const Grid = styled.div(
  ({ theme }) => `
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 -12px;
  max-width: 1600px;
  width: 100%;

  ${theme.down(theme.breakpoints.md)} {
    display: block;
  }
`
);

const DummyView = styled.div`
  width: 432px;
  margin: 0 12px;
`;

const Placeholder = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 190px;
`;

const PlaceholderText = styled.span(
  ({ theme }) => `
    font: ${theme.fonts.h3()};
    margin-bottom: 58px;
`
);

const ModalContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
`;

const ModalMessage = styled.h3`
  margin: 50px 0 0;
`;

interface ShowFeedbackModalI {
  success?: boolean;
  error?: string;
}

const Profile: NextPage = () => {
  const { logout, user } = useAuth0();
  const [getData, { data: profile }] = useLazyMojito(EMojitoQueries.profile, {
    variables: {
      organizationID: config.ORGANIZATION_ID,
    },
  });
  const inputRef = useRef<any>(null);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState<string | undefined>(
    user?.nickname
  );
  const [previousUsername, setPreviousUsername] = useState<string | undefined>(
    ""
  );
  const [showFeedbackModal, setShowFeedbackModal] =
    useState<ShowFeedbackModalI>({});

  useFetchAfterAuth(getData);

  const [updateUserSettings, { loading, error }] = useMojitoMutation<{
    userOrgId: string;
    username: string;
    avatar: string;
  }>(EMojitoMutations.updateUserOrgSettings);

  useEffect(() => {
    if (
      profile?.me &&
      profile.me.userOrgs.length &&
      profile.me.userOrgs[0].username
    ) {
      setUsernameInput(profile.me.userOrgs[0].username);
    }
  }, [profile?.me]);

  useEffect(() => {
    editMode && inputRef.current?.focus();
  }, [editMode]);

  const { lots } = Content;

  const onEdit = async () => {
    if (editMode) {
      try {
        await updateUserSettings({
          variables: {
            userOrgId: profile.me.userOrgs[0].id,
            username: usernameInput,
          },
        });
        setShowFeedbackModal({ success: true });
      } catch (error: any) {
        setShowFeedbackModal({ error: error.message });
        setUsernameInput(previousUsername);
      } finally {
        setEditMode(false);
      }
      return;
    }
    setPreviousUsername(usernameInput);
    setEditMode(true);
  };

  const onCancelEdit = () => {
    setUsernameInput(previousUsername);
    setEditMode(false);
  };

  if (!profile) return null;
  const { activeBids, userOrgs } = profile.me;
  if (!userOrgs.length) return null;
  const { avatar } = userOrgs[0];
  const userPictureBetterQuality = avatar?.replace("_normal", "_400x400");

  return (
    <Main>
      {!!Object.keys(showFeedbackModal).length && (
        <Modal onClose={() => setShowFeedbackModal({})} width="60%">
          <ModalContent>
            {!!showFeedbackModal.error ? (
              <Image
                src={images.ERROR?.src}
                alt={images.ERROR?.alt}
                width={images.ERROR?.width}
                height={images.ERROR?.height}
              />
            ) : (
              <Image
                src={images.SUCCESS?.src}
                alt={images.SUCCESS?.alt}
                width={images.SUCCESS?.width}
                height={images.SUCCESS?.height}
              />
            )}
            <ModalMessage>
              {(showFeedbackModal.error &&
                showFeedbackModal.error.charAt(0).toUpperCase() +
                  showFeedbackModal.error.slice(1)) ||
                strings.PROFILE.EDIT_SUCCESS}
            </ModalMessage>
          </ModalContent>
        </Modal>
      )}
      <TopContainer>
        <User>
          <ImageWrapper>
            <Image
              src={userPictureBetterQuality || images.AVATAR_PLACEHOLDER?.src}
              alt={images.AVATAR_PLACEHOLDER?.alt}
              width={images.AVATAR_PLACEHOLDER?.large}
              height={images.AVATAR_PLACEHOLDER?.large}
            />
          </ImageWrapper>
          <ButtonsContainer>
            <Button
              onClick={
                editMode
                  ? onCancelEdit
                  : () => logout({ returnTo: window.location.origin })
              }
            >
              {editMode
                ? strings.PROFILE.CANCEL_BUTTON
                : strings.PROFILE.LOG_OUT_BUTTON}
            </Button>
            <Edit>
              <Button onClick={onEdit}>
                {editMode
                  ? loading && !error
                    ? strings.PROFILE.LOADING
                    : strings.PROFILE.SAVE_BUTTON
                  : strings.PROFILE.EDIT_BUTTON}
              </Button>
            </Edit>
          </ButtonsContainer>
          <Info>
            {editMode ? (
              <UsernameInput
                type="text"
                value={usernameInput}
                onChange={({ target }) => setUsernameInput(target.value)}
                ref={inputRef}
              />
            ) : (
              <Username>{usernameInput}</Username>
            )}
            <BiddingScore>
              {strings.PROFILE.BIDDING_SCORE}&nbsp;
              <Score>{activeBids.length}</Score>
            </BiddingScore>
          </Info>
        </User>
      </TopContainer>
      <Bids>
        {!!activeBids.length ? (
          <>
            <BidsTitle>{strings.PROFILE.ACTIVE_BIDS}</BidsTitle>
            <Grid>
              {activeBids.map((bid: any) => {
                const lot = lots.find(
                  (item: any) => item.mojitoId === bid.marketplaceAuctionLot.id
                );
                return lot ? (
                  <LotGridItem key={lot?.mojitoId} lot={lot} />
                ) : null;
              })}
              <DummyView />
              <DummyView />
            </Grid>
          </>
        ) : (
          <Placeholder>
            <PlaceholderText>{strings.PROFILE.PLACEHOLDER}</PlaceholderText>
            <Link href="/">
              <a>
                <Button>{strings.PROFILE.HOME_BUTTON}</Button>
              </a>
            </Link>
          </Placeholder>
        )}
      </Bids>
    </Main>
  );
};

export default withAuthenticationRequired(Profile);
