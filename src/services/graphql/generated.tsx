import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  EthAddress: any;
  Time: any;
  UUID: any;
  UUID1: any;
  Upload: any;
};

export type AchBankAddressOutput = {
  __typename?: 'ACHBankAddressOutput';
  address1: Scalars['String'];
  address2: Scalars['String'];
  bankName: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
};

export type AchBillingDetails = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  district?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  postalCode?: InputMaybe<Scalars['String']>;
};

export type AchBillingDetailsOutput = {
  __typename?: 'ACHBillingDetailsOutput';
  address1: Scalars['String'];
  address2: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
  name: Scalars['String'];
  postalCode: Scalars['String'];
};

export type AchData = {
  accountId: Scalars['String'];
  billingDetails: AchBillingDetails;
  metadata: AchMetadata;
  publicToken: Scalars['String'];
};

export type AchMetadata = {
  email: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type AchMetadataOutput = {
  __typename?: 'ACHMetadataOutput';
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type AchPaymentMethodOutput = {
  __typename?: 'ACHPaymentMethodOutput';
  accountNumber: Scalars['String'];
  bankAddress?: Maybe<AchBankAddressOutput>;
  billingDetails?: Maybe<AchBillingDetailsOutput>;
  id: Scalars['UUID1'];
  metadata?: Maybe<AchMetadataOutput>;
  status: Scalars['String'];
  type: PaymentType;
};

export type AchPaymentMethodPrepareStatementOutput = {
  __typename?: 'ACHPaymentMethodPrepareStatementOutput';
  linkToken: Scalars['String'];
};

export type Asset = {
  __typename?: 'Asset';
  currentVersion?: Maybe<AssetVersion>;
  id: Scalars['UUID1'];
  versions?: Maybe<Array<AssetVersion>>;
};

export type AssetFilter = {
  organizationID?: InputMaybe<Scalars['UUID1']>;
};

export type AssetVersion = {
  __typename?: 'AssetVersion';
  arweaveTx?: Maybe<Scalars['String']>;
  asset: Asset;
  assetID: Scalars['UUID1'];
  cdnUrl?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID1'];
  isCurrent: Scalars['Boolean'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type AttributeValue = AttributeValueFloat | AttributeValueInt | AttributeValueString;

export type AttributeValueFloat = {
  __typename?: 'AttributeValueFloat';
  floatValue: Scalars['Float'];
};

export type AttributeValueInt = {
  __typename?: 'AttributeValueInt';
  intValue: Scalars['Int'];
};

export type AttributeValueString = {
  __typename?: 'AttributeValueString';
  stringValue: Scalars['String'];
};

export enum AuctionBidOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum AuctionLotStatus {
  Active = 'Active',
  Completed = 'Completed',
  Hidden = 'Hidden',
  Preview = 'Preview'
}

export type BidFilterInput = {
  marketplaceAuctionLotId?: InputMaybe<Scalars['UUID']>;
  order?: InputMaybe<AuctionBidOrder>;
  userId?: InputMaybe<Scalars['UUID']>;
};

export enum CollectionType {
  Auction = 'Auction',
  Tk2 = 'TK2'
}

export enum ContractType {
  Erc721Creator = 'ERC721Creator',
  Erc1155Creator = 'ERC1155Creator'
}

export type CreateMarketplaceBuyNowLotInput = {
  collectionId: Scalars['UUID1'];
  collectionItemName: Scalars['String'];
  endDate: Scalars['Time'];
  marketplaceTokenId: Scalars['UUID1'];
  sortNumber: Scalars['Int'];
  startDate: Scalars['Time'];
  totalUnits: Scalars['Int'];
  unitPrice: Scalars['Float'];
};

export type CreatePaymentCreditCardMetadataInput = {
  encryptedData: Scalars['String'];
  keyID: Scalars['String'];
};

export type CreatePaymentMetadataInput = {
  creditCardData: CreatePaymentCreditCardMetadataInput;
  destinationAddress?: InputMaybe<Scalars['EthAddress']>;
};

export type CreditCardBillingDetails = {
  address1: Scalars['String'];
  address2?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  district?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  postalCode: Scalars['String'];
};

export type CreditCardBillingDetailsOutput = {
  __typename?: 'CreditCardBillingDetailsOutput';
  address1: Scalars['String'];
  address2: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
  name: Scalars['String'];
  postalCode: Scalars['String'];
};

export type CreditCardData = {
  billingDetails?: InputMaybe<CreditCardBillingDetails>;
  encryptedData: Scalars['String'];
  expirationMonth: Scalars['Int'];
  expirationYear: Scalars['Int'];
  keyID: Scalars['String'];
  metadata?: InputMaybe<CreditCardMetadata>;
};

export type CreditCardMetadata = {
  email: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type CreditCardMetadataOutput = {
  __typename?: 'CreditCardMetadataOutput';
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type CreditCardPaymentMethodOutput = {
  __typename?: 'CreditCardPaymentMethodOutput';
  billingDetails?: Maybe<CreditCardBillingDetailsOutput>;
  id: Scalars['UUID1'];
  last4Digit: Scalars['String'];
  metadata?: Maybe<CreditCardMetadataOutput>;
  network: Scalars['String'];
  status: Scalars['String'];
  type: PaymentType;
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  activeBids: Array<MarketplaceAuctionBid>;
  apiKeys?: Maybe<Array<Maybe<UserApiKeyResponse>>>;
  favoriteItems?: Maybe<Array<MarketplaceCollectionItem>>;
  id: Scalars['UUID'];
  user: User;
  userOrgs: Array<UserOrganization>;
  wallets?: Maybe<Array<Wallet>>;
  wonBids: Array<MarketplaceAuctionBid>;
};


export type CurrentUserActiveBidsArgs = {
  orgId: Scalars['UUID'];
};


export type CurrentUserUserOrgsArgs = {
  filter?: InputMaybe<UserOrgFilter>;
};


export type CurrentUserWonBidsArgs = {
  orgId: Scalars['UUID'];
};

export type DeployContractInput = {
  contractType: ContractType;
  nftName: Scalars['String'];
  nftSymbol: Scalars['String'];
  organizationId: Scalars['UUID1'];
  walletId: Scalars['UUID1'];
};

export type Erc721Metadata = {
  __typename?: 'ERC721Metadata';
  animationURL?: Maybe<Scalars['String']>;
  attributes?: Maybe<Array<MetadataAttributes>>;
  backgroundColor?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  externalURL?: Maybe<Scalars['String']>;
  image: Scalars['String'];
  language?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  timestamp?: Maybe<Scalars['Int']>;
};

export enum ExtensionType {
  ProvenanceExtension = 'ProvenanceExtension'
}

export type InvoiceDetails = {
  __typename?: 'InvoiceDetails';
  externalPaymentID: Scalars['String'];
  externalUserID: Scalars['String'];
  internalUserID: Scalars['String'];
  invoiceCreatedAt: Scalars['Time'];
  invoiceID: Scalars['UUID1'];
  invoiceNumber: Scalars['Int'];
  items: Array<Maybe<ItemInvoiceDetail>>;
  paymentID: Scalars['UUID1'];
  status: InvoiceStatus;
};

export enum InvoiceStatus {
  Canceled = 'Canceled',
  Delivered = 'Delivered',
  Draft = 'Draft',
  Paid = 'Paid',
  Pending = 'Pending'
}

export type ItemInvoiceDetail = {
  __typename?: 'ItemInvoiceDetail';
  buyersPremium: Scalars['Float'];
  collectionItemID: Scalars['UUID1'];
  collectionItemTitle: Scalars['String'];
  collectionTitle: Scalars['String'];
  destinationAddress: Scalars['String'];
  overheadPremium: Scalars['Float'];
  saleDate: Scalars['Time'];
  salesTaxRate: Scalars['Float'];
  taxes: Scalars['Float'];
  totalPrice: Scalars['Float'];
  unitPrice: Scalars['Float'];
  units: Scalars['Int'];
};

export enum KycStatus {
  Level1 = 'Level1',
  Level2 = 'Level2',
  None = 'None',
  Pending = 'Pending'
}

export enum MarketCollectionStatus {
  Active = 'Active',
  Archived = 'Archived',
  Inactive = 'Inactive'
}

export type Marketplace = {
  __typename?: 'Marketplace';
  collections?: Maybe<Array<MarketplaceCollection>>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  organizationID: Scalars['String'];
  theme?: Maybe<Scalars['String']>;
  tokens?: Maybe<Array<MarketplaceToken>>;
};

export type MarketplaceAuctionBid = {
  __typename?: 'MarketplaceAuctionBid';
  amount: Scalars['Float'];
  buyersPremium: Scalars['Float'];
  createdAt: Scalars['Time'];
  currentBid: Scalars['Float'];
  finalPrice: Scalars['Float'];
  id: Scalars['UUID'];
  isCurrent: Scalars['Boolean'];
  isMine: Scalars['Boolean'];
  marketplaceAuctionLot: MarketplaceAuctionLot;
  marketplaceAuctionLotId: Scalars['UUID1'];
  marketplaceUser?: Maybe<MarketplaceUser>;
  maximumBid?: Maybe<Scalars['Float']>;
  nextBidIncrement: Scalars['Float'];
  overheadPremium: Scalars['Float'];
  userId: Scalars['UUID'];
  userOrganization: UserOrganization;
};

export type MarketplaceAuctionBidInput = {
  amount: Scalars['Float'];
  marketplaceAuctionLotId: Scalars['UUID'];
};

export type MarketplaceAuctionDefaultConfig = {
  __typename?: 'MarketplaceAuctionDefaultConfig';
  collectionId: Scalars['UUID'];
  endDate: Scalars['Time'];
  id: Scalars['UUID'];
  minIncrement: Scalars['Float'];
  reservePrice?: Maybe<Scalars['Float']>;
  startDate: Scalars['Time'];
};

export type MarketplaceAuctionFeeStructure = {
  __typename?: 'MarketplaceAuctionFeeStructure';
  buyersPremiumRate: Array<MarketplaceAuctionFeeStructureItem>;
  overheadPremiumRate: Array<MarketplaceAuctionFeeStructureItem>;
};

export type MarketplaceAuctionFeeStructureItem = {
  __typename?: 'MarketplaceAuctionFeeStructureItem';
  from: Scalars['Float'];
  rate: Scalars['Float'];
  to?: Maybe<Scalars['Float']>;
};

export type MarketplaceAuctionLot = {
  __typename?: 'MarketplaceAuctionLot';
  bids: Array<MarketplaceAuctionBid>;
  currentBid?: Maybe<MarketplaceAuctionBid>;
  defaultConfig: MarketplaceAuctionDefaultConfig;
  endDate: Scalars['Time'];
  feeStructure: MarketplaceAuctionFeeStructure;
  id: Scalars['UUID'];
  lotNumber?: Maybe<Scalars['Int']>;
  marketplaceCollectionItem?: Maybe<MarketplaceCollectionItem>;
  marketplaceCollectionItemId: Scalars['UUID1'];
  myBid?: Maybe<MarketplaceAuctionBid>;
  previewDate?: Maybe<Scalars['Time']>;
  reserveMet: Scalars['Boolean'];
  reservePrice?: Maybe<Scalars['Float']>;
  startDate: Scalars['Time'];
  startingBid?: Maybe<Scalars['Float']>;
  status: AuctionLotStatus;
};


export type MarketplaceAuctionLotBidsArgs = {
  filter?: InputMaybe<BidFilterInput>;
};


export type MarketplaceAuctionLotDefaultConfigArgs = {
  collectionId: Scalars['UUID'];
};

export type MarketplaceAuctionLotInput = {
  collectionId: Scalars['UUID'];
  collectionItemName: Scalars['String'];
  endDate: Scalars['Time'];
  lotNumber?: InputMaybe<Scalars['Int']>;
  marketplaceTokenId: Scalars['UUID'];
  reservePrice?: InputMaybe<Scalars['Float']>;
  saleType: MarketplaceSaleType;
  startDate: Scalars['Time'];
  startingBid?: InputMaybe<Scalars['Float']>;
};

export type MarketplaceAuctionLotUpdateInput = {
  endDate?: InputMaybe<Scalars['Time']>;
  lotNumber?: InputMaybe<Scalars['Int']>;
  reservePrice?: InputMaybe<Scalars['Float']>;
  startDate?: InputMaybe<Scalars['Time']>;
  startingBid?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<AuctionLotStatus>;
};

export type MarketplaceBuyNowOutput = {
  __typename?: 'MarketplaceBuyNowOutput';
  endDate: Scalars['Time'];
  id: Scalars['UUID'];
  invoice?: Maybe<InvoiceDetails>;
  marketplaceCollectionItem?: Maybe<MarketplaceCollectionItem>;
  sortNumber: Scalars['Int'];
  startDate: Scalars['Time'];
  totalAvailableUnits: Scalars['Int'];
  totalUnits: Scalars['Int'];
  unitPrice: Scalars['Float'];
};

export type MarketplaceCollection = {
  __typename?: 'MarketplaceCollection';
  collectionType: CollectionType;
  description: Scalars['String'];
  endDate?: Maybe<Scalars['Time']>;
  id: Scalars['UUID1'];
  items?: Maybe<Array<MarketplaceCollectionItem>>;
  marketplaceID: Scalars['UUID1'];
  name: Scalars['String'];
  slug: Scalars['String'];
  startDate?: Maybe<Scalars['Time']>;
  status: MarketCollectionStatus;
};


export type MarketplaceCollectionItemsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  statuses?: InputMaybe<Array<InputMaybe<MarketplaceCollectionItemStatus>>>;
};

export type MarketplaceCollectionCreateInput = {
  description: Scalars['String'];
  endDate?: InputMaybe<Scalars['Time']>;
  name: Scalars['String'];
  startDate?: InputMaybe<Scalars['Time']>;
  status?: InputMaybe<MarketCollectionStatus>;
};

export type MarketplaceCollectionItem = {
  __typename?: 'MarketplaceCollectionItem';
  collectionId: Scalars['UUID'];
  details: MarketplaceCollectionItemDetails;
  id: Scalars['UUID'];
  /** @deprecated Use `details` property instead */
  lot: MarketplaceAuctionLot;
  marketplaceTokenId: Scalars['UUID'];
  name: Scalars['String'];
  saleType: MarketplaceSaleType;
  slug: Scalars['String'];
  status: MarketplaceCollectionItemStatus;
};

export type MarketplaceCollectionItemDetails = MarketplaceAuctionLot | MarketplaceBuyNowOutput;

export enum MarketplaceCollectionItemStatus {
  Active = 'Active',
  Completed = 'Completed',
  Hidden = 'Hidden',
  Preview = 'Preview'
}

export type MarketplaceCollectionUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['Time']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['Time']>;
  status?: InputMaybe<MarketCollectionStatus>;
};

export enum MarketplaceSaleType {
  Auction = 'Auction',
  BuyNow = 'BuyNow'
}

export type MarketplaceToken = {
  __typename?: 'MarketplaceToken';
  id: Scalars['UUID'];
  marketplaceID: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  nftContractAddress: Scalars['String'];
  nftTokenID?: Maybe<Scalars['UUID']>;
  onChainTokenID: Scalars['Int'];
};

export type MarketplaceUser = {
  __typename?: 'MarketplaceUser';
  avatar?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  username?: Maybe<Scalars['String']>;
};

export type MetadataAttributes = {
  __typename?: 'MetadataAttributes';
  displayType?: Maybe<Scalars['String']>;
  maxValue?: Maybe<Scalars['Int']>;
  traitType: Scalars['String'];
  value: AttributeValue;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Add an existing lot to User favorite lots list.
   *     If lot is already exists, then do nothing.
   *     If provided lot is invalid or not exists, then error message will be returned.
   */
  addCollectionItemToUserFavorites: Scalars['Boolean'];
  addExistingTokenToCollection: Scalars['String'];
  addOrganization: Organization;
  addTokensToCollection: Scalars['String'];
  cancelMarketplaceAuctionBid: Scalars['Boolean'];
  /** Cancels payment by ID, can be called by org admin */
  cancelPayment: Scalars['Boolean'];
  /** Creates invoice for given Lot, can be called by org admin */
  createAuctionLotInvoice: InvoiceDetails;
  createMarketplaceAuctionBid: MarketplaceAuctionBid;
  createMarketplaceAuctionLot: MarketplaceAuctionLot;
  createMarketplaceBuyNowLot: MarketplaceBuyNowOutput;
  createMarketplaceCollection: MarketplaceCollection;
  createOrgByUser: UserOrganization;
  /** Creates a multisig with organization as parent type */
  createOrgMultisig: Scalars['String'];
  /** Creates payment for given Invoice */
  createPayment: Payment;
  /** Creates new Payment method based on input data. */
  createPaymentMethod: PaymentMethodOutput;
  createTokenDraft: Scalars['String'];
  /** Create a new API key for given User and Organization. */
  createUserAPIKey?: Maybe<UserApiKeyResponse>;
  /** Creates a multisig with user as parent type */
  createUserMultisig: Scalars['String'];
  deleteAsset: Scalars['String'];
  /**
   * Delete an existing lot from User favorite lots list.
   *     If lot has been already deleted, then do nothing.
   *     If provided lot is invalid or not exists, then error message will be returned.
   */
  deleteCollectionItemFromUserFavorites: Scalars['Boolean'];
  /** Deletes existing Payment method by Payment ID. */
  deletePaymentMethod: Scalars['Boolean'];
  deleteToken: Scalars['String'];
  /** Delete an existing API key. */
  deleteUserAPIKey: Scalars['Boolean'];
  importExternalTokenToCollection: Scalars['String'];
  loginWithSignature: Organization;
  marketplaceUpdateTheme: Marketplace;
  mintTokens: Scalars['String'];
  nftContractAddAdmin: Scalars['String'];
  nftContractExtensionPause: Scalars['String'];
  nftContractExtensionUnpause: Scalars['String'];
  nftContractRegisterExtensionProvenance: NftContract;
  nftDeployContract: NftContract;
  orgCreateMarketplace: Marketplace;
  ping: Scalars['String'];
  /** Release reservations held by invoice ID */
  releaseReservation: Scalars['Boolean'];
  reserveMarketplaceBuyNowLot: MarketplaceBuyNowOutput;
  setJwtIssuerDomain: Organization;
  transferToken: Scalars['String'];
  updateMarketplaceAuctionLot: MarketplaceAuctionLot;
  updateMarketplaceCollection: MarketplaceCollection;
  /** Update name of multisig wallet */
  updateMultisigName: Scalars['Boolean'];
  /** Update existing Payment method based on input data. */
  updatePaymentMethod: Scalars['Boolean'];
  updateTokenDraft: Scalars['String'];
  updateUserOrgRole: UserOrganization;
  updateUserOrgSettings: UserOrganization;
  uploadArweaveAsset: Scalars['String'];
  uploadArweaveMetadata: Scalars['String'];
  uploadAsset: Scalars['String'];
};


export type MutationAddCollectionItemToUserFavoritesArgs = {
  collectionItemId: Scalars['UUID1'];
};


export type MutationAddExistingTokenToCollectionArgs = {
  marketplaceId: Scalars['UUID1'];
  tokenId: Scalars['UUID1'];
};


export type MutationAddOrganizationArgs = {
  handle: Scalars['String'];
  name: Scalars['String'];
};


export type MutationAddTokensToCollectionArgs = {
  marketplaceId: Scalars['UUID1'];
  tokenIds: Array<Scalars['UUID1']>;
};


export type MutationCancelMarketplaceAuctionBidArgs = {
  bidID: Scalars['UUID1'];
  marketplaceID: Scalars['UUID1'];
};


export type MutationCancelPaymentArgs = {
  orgID: Scalars['UUID1'];
  paymentID: Scalars['UUID1'];
};


export type MutationCreateAuctionLotInvoiceArgs = {
  lotID: Scalars['UUID1'];
  orgID: Scalars['UUID1'];
};


export type MutationCreateMarketplaceAuctionBidArgs = {
  marketplaceAuctionBid: MarketplaceAuctionBidInput;
};


export type MutationCreateMarketplaceAuctionLotArgs = {
  marketplaceAuctionLot: MarketplaceAuctionLotInput;
};


export type MutationCreateMarketplaceBuyNowLotArgs = {
  input: CreateMarketplaceBuyNowLotInput;
};


export type MutationCreateMarketplaceCollectionArgs = {
  data: MarketplaceCollectionCreateInput;
  marketplaceID: Scalars['String'];
};


export type MutationCreateOrgByUserArgs = {
  handle: Scalars['String'];
  name: Scalars['String'];
};


export type MutationCreateOrgMultisigArgs = {
  chainId: Scalars['Int'];
  name: Scalars['String'];
  orgId: Scalars['UUID1'];
};


export type MutationCreatePaymentArgs = {
  invoiceID: Scalars['UUID1'];
  metadata?: InputMaybe<CreatePaymentMetadataInput>;
  paymentMethodID: Scalars['UUID1'];
};


export type MutationCreatePaymentMethodArgs = {
  input: PaymentMethodCreateInput;
  orgID: Scalars['UUID1'];
};


export type MutationCreateTokenDraftArgs = {
  contractId: Scalars['UUID1'];
  tokens: Array<TokenDraft>;
};


export type MutationCreateUserApiKeyArgs = {
  orgId: Scalars['UUID1'];
};


export type MutationCreateUserMultisigArgs = {
  chainId: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationDeleteAssetArgs = {
  assetId: Scalars['UUID1'];
};


export type MutationDeleteCollectionItemFromUserFavoritesArgs = {
  collectionItemId: Scalars['UUID1'];
};


export type MutationDeletePaymentMethodArgs = {
  orgID: Scalars['UUID1'];
  paymentMethodID: Scalars['UUID1'];
};


export type MutationDeleteTokenArgs = {
  tokenId: Scalars['UUID1'];
};


export type MutationDeleteUserApiKeyArgs = {
  keyId: Scalars['UUID1'];
};


export type MutationImportExternalTokenToCollectionArgs = {
  contractAddress: Scalars['String'];
  marketplaceId: Scalars['UUID1'];
  onChainId: Scalars['Int'];
};


export type MutationLoginWithSignatureArgs = {
  request: SigninRequest;
};


export type MutationMarketplaceUpdateThemeArgs = {
  id: Scalars['String'];
  theme: Scalars['String'];
};


export type MutationMintTokensArgs = {
  tokenIds: Array<Scalars['UUID1']>;
};


export type MutationNftContractAddAdminArgs = {
  address: Scalars['String'];
  nftContractId: Scalars['UUID1'];
};


export type MutationNftContractExtensionPauseArgs = {
  extensionAddress: Scalars['String'];
  nftContractId: Scalars['UUID1'];
};


export type MutationNftContractExtensionUnpauseArgs = {
  extensionAddress: Scalars['String'];
  nftContractId: Scalars['UUID1'];
};


export type MutationNftContractRegisterExtensionProvenanceArgs = {
  contractId: Scalars['UUID1'];
  maxTokenSupply: Scalars['Int'];
};


export type MutationNftDeployContractArgs = {
  input: DeployContractInput;
};


export type MutationOrgCreateMarketplaceArgs = {
  name: Scalars['String'];
  orgId?: InputMaybe<Scalars['UUID1']>;
};


export type MutationReleaseReservationArgs = {
  invoiceID: Scalars['UUID1'];
  orgID?: InputMaybe<Scalars['UUID1']>;
};


export type MutationReserveMarketplaceBuyNowLotArgs = {
  input: ReserveMarketplaceBuyNowLotInput;
};


export type MutationSetJwtIssuerDomainArgs = {
  domain: Scalars['String'];
  orgId: Scalars['UUID'];
};


export type MutationTransferTokenArgs = {
  contractAddress: Scalars['String'];
  tokenOnChainId: Scalars['Int'];
  transferTo: Scalars['String'];
  walletId: Scalars['UUID1'];
};


export type MutationUpdateMarketplaceAuctionLotArgs = {
  data: MarketplaceAuctionLotUpdateInput;
  marketplaceAuctionLotId: Scalars['UUID'];
};


export type MutationUpdateMarketplaceCollectionArgs = {
  data: MarketplaceCollectionUpdateInput;
  id: Scalars['UUID1'];
};


export type MutationUpdateMultisigNameArgs = {
  newName: Scalars['String'];
  walletID: Scalars['UUID1'];
};


export type MutationUpdatePaymentMethodArgs = {
  input: PaymentMethodUpdateInput;
  orgID: Scalars['UUID1'];
  paymentMethodID: Scalars['UUID1'];
};


export type MutationUpdateTokenDraftArgs = {
  token: TokenDraft;
};


export type MutationUpdateUserOrgRoleArgs = {
  orgID: Scalars['UUID'];
  role: Scalars['String'];
  userID: Scalars['UUID'];
};


export type MutationUpdateUserOrgSettingsArgs = {
  params: SettingsInput;
};


export type MutationUploadArweaveAssetArgs = {
  assetVersionId: Scalars['UUID1'];
};


export type MutationUploadArweaveMetadataArgs = {
  tokenId: Scalars['UUID1'];
};


export type MutationUploadAssetArgs = {
  file: Scalars['Upload'];
  name: Scalars['String'];
  orgId: Scalars['UUID1'];
};

export type NftContract = {
  __typename?: 'NFTContract';
  activationTxHash: Scalars['String'];
  admins: Array<Scalars['String']>;
  arweavePathManifest?: Maybe<Scalars['String']>;
  contractAddress: Scalars['EthAddress'];
  deploymentTxHash?: Maybe<Scalars['String']>;
  id: Scalars['UUID1'];
  marketplaceAddress: Scalars['EthAddress'];
  mediaTxHash?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nftContractType: NftContractType;
  nftTokens?: Maybe<Array<NftToken>>;
  symbol?: Maybe<Scalars['String']>;
  transferOwnershipHash?: Maybe<Scalars['String']>;
  wallet: Wallet;
};

export type NftContractType = {
  __typename?: 'NFTContractType';
  id: Scalars['UUID1'];
  name: Scalars['String'];
};

export type NftMetadata = {
  __typename?: 'NFTMetadata';
  copyright?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type NftToken = {
  __typename?: 'NFTToken';
  asset?: Maybe<Asset>;
  assetId?: Maybe<Scalars['UUID1']>;
  deployed: Scalars['Boolean'];
  ethereumTxId?: Maybe<Scalars['String']>;
  id: Scalars['UUID1'];
  metadataArweaveTxId?: Maybe<Scalars['String']>;
  metadataArweaveTxLink?: Maybe<Scalars['String']>;
  metadataJSON?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nftContract: NftContract;
  nftContractID: Scalars['UUID1'];
  onChainId?: Maybe<Scalars['Int']>;
  royaltyBasisPoints?: Maybe<Scalars['Int']>;
};

export type Network = {
  __typename?: 'Network';
  chainID: Scalars['Int'];
  id: Scalars['UUID1'];
  name: Scalars['String'];
  openSeaProxyAddress: Scalars['String'];
  rpcURL: Scalars['String'];
  safeFactoryAddress: Scalars['String'];
  safeFallbackHandler: Scalars['String'];
  safeMasterContractAddress: Scalars['String'];
  wethAddress: Scalars['String'];
};

export type Organization = {
  __typename?: 'Organization';
  assets?: Maybe<Array<Asset>>;
  handle: Scalars['String'];
  id: Scalars['UUID1'];
  jwtIssuerDomain?: Maybe<Scalars['String']>;
  marketplaces: Array<Marketplace>;
  members: Array<OrganizationMember>;
  name: Scalars['String'];
  nftContracts?: Maybe<Array<NftContract>>;
  wallets?: Maybe<Array<Wallet>>;
};


export type OrganizationAssetsArgs = {
  filter?: InputMaybe<AssetFilter>;
};

export type OrganizationMember = {
  __typename?: 'OrganizationMember';
  email?: Maybe<Scalars['String']>;
  externalId: Scalars['String'];
  id: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type Payment = {
  __typename?: 'Payment';
  circlePaymentID: Scalars['String'];
  id: Scalars['UUID1'];
  invoiceID: Scalars['UUID1'];
  paymentMethodID: Scalars['UUID1'];
  status: PaymentStatus;
  userID: Scalars['UUID1'];
};

export type PaymentMethodCreateInput = {
  achData?: InputMaybe<AchData>;
  creditCardData?: InputMaybe<CreditCardData>;
  paymentType: PaymentType;
  wireData?: InputMaybe<WireData>;
};

export type PaymentMethodOutput = AchPaymentMethodOutput | CreditCardPaymentMethodOutput | WirePaymentMethodOutput;

export type PaymentMethodPrepareStatementOutput = AchPaymentMethodPrepareStatementOutput;

export type PaymentMethodUpdateInput = {
  achData?: InputMaybe<AchData>;
  creditCardData?: InputMaybe<CreditCardData>;
  paymentType: PaymentType;
};

export type PaymentNotification3DsMessage = {
  __typename?: 'PaymentNotification3DSMessage';
  redirectURL: Scalars['String'];
};

export type PaymentNotificationMessage = PaymentNotification3DsMessage;

export type PaymentNotificationOutput = {
  __typename?: 'PaymentNotificationOutput';
  message: PaymentNotificationMessage;
};

export type PaymentPublicKey = {
  __typename?: 'PaymentPublicKey';
  keyID: Scalars['String'];
  publicKey: Scalars['String'];
};

export enum PaymentStatus {
  ActionRequired = 'action_required',
  Confirmed = 'confirmed',
  Failed = 'failed',
  Paid = 'paid',
  Pending = 'pending'
}

export enum PaymentType {
  Ach = 'ACH',
  CreditCard = 'CreditCard',
  Wire = 'Wire'
}

export type Query = {
  __typename?: 'Query';
  collection?: Maybe<MarketplaceCollection>;
  collectionBySlug?: Maybe<MarketplaceCollection>;
  collectionItemById?: Maybe<MarketplaceCollectionItem>;
  /** Retrieves invoice details by ID */
  getInvoiceDetails: InvoiceDetails;
  /** Retrieves invoice list for given user, can be called by org admin */
  getInvoicesByUserID: Array<Maybe<InvoiceDetails>>;
  getMarketplaceAuctionLot: MarketplaceAuctionLot;
  /** Retrieves invoices user owns */
  getMyInvoices: Array<Maybe<InvoiceDetails>>;
  /** Retrieves payments user owns */
  getMyPayments: Array<Maybe<Payment>>;
  /** Returns requested Payment method */
  getPaymentMethod: PaymentMethodOutput;
  /** Returns Payment method list in scope of current Organization. */
  getPaymentMethodList: Array<PaymentMethodOutput>;
  /** Retrieves Payment notification */
  getPaymentNotification: PaymentNotificationOutput;
  /** Returns Public Key for further Payment data encryption. */
  getPaymentPublicKey: PaymentPublicKey;
  /** Retrieves payment list for given user, can be called by org admin */
  getPaymentsByUserID: Array<Maybe<Payment>>;
  /** Get Tax Quote */
  getTaxQuote: TaxQuoteOutput;
  marketplace: Marketplace;
  me?: Maybe<CurrentUser>;
  network: Network;
  nftContract: NftContract;
  nftToken: NftToken;
  orgUsernameAvailable: Scalars['Boolean'];
  organization: Organization;
  organizationByID: Organization;
  ping: Scalars['String'];
  /** Prepare requested Payment method for further use */
  preparePaymentMethod?: Maybe<PaymentMethodPrepareStatementOutput>;
  serverTime: Scalars['Time'];
  validateIp: ValidateIpResponse;
  /** Validate Payment limit */
  validatePaymentLimit: ValidatePaymentLimitOutput;
  wallet: Wallet;
};


export type QueryCollectionArgs = {
  id: Scalars['String'];
};


export type QueryCollectionBySlugArgs = {
  marketplaceID: Scalars['UUID1'];
  slug: Scalars['String'];
};


export type QueryCollectionItemByIdArgs = {
  id: Scalars['UUID1'];
};


export type QueryGetInvoiceDetailsArgs = {
  invoiceID: Scalars['UUID1'];
  orgID?: InputMaybe<Scalars['UUID1']>;
};


export type QueryGetInvoicesByUserIdArgs = {
  orgID: Scalars['UUID1'];
  userID: Scalars['UUID1'];
};


export type QueryGetMarketplaceAuctionLotArgs = {
  marketplaceAuctionLotId: Scalars['UUID'];
};


export type QueryGetPaymentMethodArgs = {
  paymentMethodID: Scalars['UUID1'];
};


export type QueryGetPaymentMethodListArgs = {
  orgID: Scalars['UUID1'];
};


export type QueryGetPaymentsByUserIdArgs = {
  orgID: Scalars['UUID1'];
  userID: Scalars['UUID1'];
};


export type QueryGetTaxQuoteArgs = {
  input: TaxQuoteInput;
};


export type QueryMarketplaceArgs = {
  id: Scalars['UUID'];
};


export type QueryNetworkArgs = {
  id: Scalars['UUID1'];
};


export type QueryNftContractArgs = {
  id: Scalars['UUID1'];
};


export type QueryNftTokenArgs = {
  id: Scalars['UUID1'];
};


export type QueryOrgUsernameAvailableArgs = {
  organizationID: Scalars['UUID1'];
  username: Scalars['String'];
};


export type QueryOrganizationArgs = {
  handle: Scalars['String'];
};


export type QueryOrganizationByIdArgs = {
  id?: InputMaybe<Scalars['UUID1']>;
};


export type QueryPreparePaymentMethodArgs = {
  paymentMethodType: PaymentType;
};


export type QueryValidateIpArgs = {
  ip: Scalars['String'];
  organizationID: Scalars['UUID1'];
};


export type QueryValidatePaymentLimitArgs = {
  collectionID: Scalars['UUID1'];
  itemsCount: Scalars['Int'];
};


export type QueryWalletArgs = {
  id: Scalars['UUID1'];
};

export type ReserveMarketplaceBuyNowLotInput = {
  itemCount: Scalars['Int'];
  marketplaceBuyNowLotID: Scalars['UUID1'];
};

export enum Role {
  Admin = 'admin',
  User = 'user'
}

export type SettingsInput = {
  avatar?: InputMaybe<Scalars['String']>;
  settingsJson?: InputMaybe<Scalars['String']>;
  userOrgId: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
};

export type SigninRequest = {
  challenge: Scalars['String'];
  signature: Scalars['String'];
  signer: Scalars['String'];
};

export type SigninResponse = {
  __typename?: 'SigninResponse';
  me: CurrentUser;
  refreshToken: Scalars['String'];
  token: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  auctionLotUpdated: MarketplaceAuctionLot;
  bidFeed: MarketplaceAuctionBid;
  /** Returns a MarketplaceAuctionLot on subscribe and whenever a new bid is placed */
  getMarketplaceAuctionLot: MarketplaceAuctionLot;
  /** Subscribes to lots and bids updates within given marketplace collection */
  marketplaceCollectionLotsUpdates: MarketplaceAuctionLot;
};


export type SubscriptionAuctionLotUpdatedArgs = {
  marketplaceAuctionLotId: Scalars['UUID'];
};


export type SubscriptionBidFeedArgs = {
  marketplaceAuctionLotId: Scalars['UUID'];
};


export type SubscriptionGetMarketplaceAuctionLotArgs = {
  marketplaceAuctionLotId: Scalars['UUID1'];
};


export type SubscriptionMarketplaceCollectionLotsUpdatesArgs = {
  collectionId: Scalars['UUID1'];
};

export type TaxQuoteBillingAddressInput = {
  city: Scalars['String'];
  country: Scalars['String'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
  street1: Scalars['String'];
};

export type TaxQuoteBillingAddressOutput = {
  __typename?: 'TaxQuoteBillingAddressOutput';
  city: Scalars['String'];
  country: Scalars['String'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
  street1: Scalars['String'];
};

export type TaxQuoteInput = {
  address: TaxQuoteBillingAddressInput;
  taxablePrice: Scalars['Float'];
};

export type TaxQuoteOutput = {
  __typename?: 'TaxQuoteOutput';
  taxablePrice: Scalars['Float'];
  totalTaxAmount: Scalars['Float'];
  totalTaxedPrice: Scalars['Float'];
  verifiedAddress: TaxQuoteBillingAddressOutput;
};

export type TokenDraft = {
  assetId?: InputMaybe<Scalars['UUID1']>;
  copyright?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  metadataJSON?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  royaltyBasisPoints?: InputMaybe<Scalars['Int']>;
  tokenId?: InputMaybe<Scalars['UUID1']>;
};

export enum TransactionStatus {
  Completed = 'Completed',
  Failed = 'Failed',
  Pending = 'Pending'
}

export enum TransactionType {
  DeployMultisig = 'DeployMultisig',
  TransferToken = 'TransferToken'
}

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserApiKeyResponse = {
  __typename?: 'UserAPIKeyResponse';
  createdAt?: Maybe<Scalars['Time']>;
  id?: Maybe<Scalars['UUID1']>;
  key?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Time']>;
};

export type UserOrgFilter = {
  orgId: Scalars['UUID'];
};

export type UserOrganization = {
  __typename?: 'UserOrganization';
  avatar?: Maybe<Scalars['String']>;
  bidAllowed: Scalars['Boolean'];
  externalUserId: Scalars['String'];
  id: Scalars['UUID'];
  kycStatus: KycStatus;
  organization: Organization;
  organizationId: Scalars['UUID'];
  role: Scalars['String'];
  settings?: Maybe<Scalars['String']>;
  user: User;
  userId: Scalars['UUID'];
  username?: Maybe<Scalars['String']>;
};

export type ValidateIpResponse = {
  __typename?: 'ValidateIPResponse';
  Success: Scalars['Boolean'];
  ipScreeningId: Scalars['UUID1'];
};

export type ValidatePaymentLimitData = {
  __typename?: 'ValidatePaymentLimitData';
  isLimitExceeded: Scalars['Boolean'];
  remainingTotal: Scalars['Int'];
  remainingTransaction: Scalars['Int'];
};

export type ValidatePaymentLimitOutput = {
  __typename?: 'ValidatePaymentLimitOutput';
  ach: ValidatePaymentLimitData;
  creditCard: ValidatePaymentLimitData;
  wire: ValidatePaymentLimitData;
};

export type Wallet = {
  __typename?: 'Wallet';
  address?: Maybe<Scalars['EthAddress']>;
  deploymentTxHash?: Maybe<Scalars['String']>;
  gnosisSafeURL?: Maybe<Scalars['String']>;
  id: Scalars['UUID1'];
  name: Scalars['String'];
  network: Network;
  networkId: Scalars['UUID1'];
  parentID: Scalars['UUID1'];
  parentType: Scalars['String'];
  tokens?: Maybe<Array<WalletToken>>;
};

export enum WalletParentType {
  Organization = 'organization',
  User = 'user'
}

export type WalletToken = {
  __typename?: 'WalletToken';
  contractAddress: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  /** Token ID in smart contract */
  id: Scalars['Int'];
  metadata?: Maybe<Erc721Metadata>;
  timeLastUpdated?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  tokenType?: Maybe<Scalars['String']>;
  tokenURI?: Maybe<Scalars['String']>;
};

export enum WalletTxType {
  MojitoHotWallet = 'MojitoHotWallet',
  Multisig = 'Multisig'
}

export type WireBankAddress = {
  address1?: InputMaybe<Scalars['String']>;
  address2?: InputMaybe<Scalars['String']>;
  bankName?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country: Scalars['String'];
  district?: InputMaybe<Scalars['String']>;
};

export type WireBankAddressOutput = {
  __typename?: 'WireBankAddressOutput';
  address1: Scalars['String'];
  address2: Scalars['String'];
  bankName: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
};

export type WireBeneficiary = {
  __typename?: 'WireBeneficiary';
  address1: Scalars['String'];
  address2: Scalars['String'];
  name: Scalars['String'];
};

export type WireBeneficiaryBank = {
  __typename?: 'WireBeneficiaryBank';
  accountNumber: Scalars['String'];
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  name: Scalars['String'];
  postalCode: Scalars['String'];
  routingNumber: Scalars['String'];
  swiftCode: Scalars['String'];
};

export type WireBillingDetails = {
  address1: Scalars['String'];
  address2?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  district?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  postalCode: Scalars['String'];
};

export type WireBillingDetailsOutput = {
  __typename?: 'WireBillingDetailsOutput';
  address1: Scalars['String'];
  address2: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
  name: Scalars['String'];
  postalCode: Scalars['String'];
};

export type WireData = {
  accountNumber: Scalars['String'];
  bankAddress: WireBankAddress;
  billingDetails: WireBillingDetails;
  routingNumber: Scalars['String'];
};

export type WireInstructions = {
  __typename?: 'WireInstructions';
  beneficiary: WireBeneficiary;
  beneficiaryBank: WireBeneficiaryBank;
  trackingRef: Scalars['String'];
};

export type WirePaymentMethodOutput = {
  __typename?: 'WirePaymentMethodOutput';
  bankAddress?: Maybe<WireBankAddressOutput>;
  billingDetails?: Maybe<WireBillingDetailsOutput>;
  description: Scalars['String'];
  id: Scalars['UUID1'];
  instructions?: Maybe<WireInstructions>;
  status: Scalars['String'];
  type: PaymentType;
};

export type PlaceBidMutationVariables = Exact<{
  marketplaceAuctionLotId: Scalars['UUID'];
  amount: Scalars['Float'];
}>;


export type PlaceBidMutation = { __typename?: 'Mutation', createMarketplaceAuctionBid: { __typename?: 'MarketplaceAuctionBid', id: any, amount: number, marketplaceAuctionLotId: any, userId: any } };

export type RemoveFromUserFavoritesMutationVariables = Exact<{
  collectionItemId: Scalars['UUID1'];
}>;


export type RemoveFromUserFavoritesMutation = { __typename?: 'Mutation', deleteCollectionItemFromUserFavorites: boolean };

export type SaveToFavoritesMutationVariables = Exact<{
  collectionItemId: Scalars['UUID1'];
}>;


export type SaveToFavoritesMutation = { __typename?: 'Mutation', addCollectionItemToUserFavorites: boolean };

export type UpdateUserOrgSettingsMutationVariables = Exact<{
  userOrgId: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  settingsJson?: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserOrgSettingsMutation = { __typename?: 'Mutation', updateUserOrgSettings: { __typename?: 'UserOrganization', id: any } };

export type CheckUsernameQueryVariables = Exact<{
  organizationID: Scalars['UUID1'];
  username: Scalars['String'];
}>;


export type CheckUsernameQuery = { __typename?: 'Query', orgUsernameAvailable: boolean };

export type CollectionBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
  marketplaceID: Scalars['UUID1'];
}>;


export type CollectionBySlugQuery = { __typename?: 'Query', collectionBySlug?: { __typename?: 'MarketplaceCollection', id: any, items?: Array<{ __typename?: 'MarketplaceCollectionItem', id: any, slug: string, name: string, details: { __typename?: 'MarketplaceAuctionLot', marketplaceCollectionItemId: any, startDate: any, endDate: any, status: AuctionLotStatus, feeStructure: { __typename?: 'MarketplaceAuctionFeeStructure', buyersPremiumRate: Array<{ __typename?: 'MarketplaceAuctionFeeStructureItem', from: number, to?: number | null, rate: number }>, overheadPremiumRate: Array<{ __typename?: 'MarketplaceAuctionFeeStructureItem', from: number, to?: number | null, rate: number }> }, currentBid?: { __typename?: 'MarketplaceAuctionBid', id: any, marketplaceAuctionLotId: any, amount: number, isCurrent: boolean, nextBidIncrement: number, createdAt: any, marketplaceUser?: { __typename?: 'MarketplaceUser', id: any, username?: string | null, avatar?: string | null } | null, userOrganization: { __typename?: 'UserOrganization', user: { __typename?: 'User', name?: string | null } } } | null, myBid?: { __typename?: 'MarketplaceAuctionBid', id: any, createdAt: any, marketplaceAuctionLotId: any, amount: number } | null } | { __typename?: 'MarketplaceBuyNowOutput', unitPrice: number, totalUnits: number, totalAvailableUnits: number, startDate: any, endDate: any, sortNumber: number } }> | null } | null };

export type CollectionItemQueryVariables = Exact<{
  id: Scalars['UUID1'];
  filter: BidFilterInput;
}>;


export type CollectionItemQuery = { __typename?: 'Query', collectionItemById?: { __typename?: 'MarketplaceCollectionItem', id: any, slug: string, name: string, details: { __typename?: 'MarketplaceAuctionLot', marketplaceCollectionItemId: any, startDate: any, endDate: any, status: AuctionLotStatus, bids: Array<{ __typename?: 'MarketplaceAuctionBid', id: any, createdAt: any, marketplaceAuctionLotId: any, amount: number, marketplaceUser?: { __typename?: 'MarketplaceUser', id: any, avatar?: string | null, username?: string | null } | null, userOrganization: { __typename?: 'UserOrganization', user: { __typename?: 'User', name?: string | null } } }>, feeStructure: { __typename?: 'MarketplaceAuctionFeeStructure', buyersPremiumRate: Array<{ __typename?: 'MarketplaceAuctionFeeStructureItem', from: number, to?: number | null, rate: number }>, overheadPremiumRate: Array<{ __typename?: 'MarketplaceAuctionFeeStructureItem', from: number, to?: number | null, rate: number }> }, currentBid?: { __typename?: 'MarketplaceAuctionBid', id: any, marketplaceAuctionLotId: any, amount: number, isCurrent: boolean, nextBidIncrement: number, createdAt: any, marketplaceUser?: { __typename?: 'MarketplaceUser', id: any, username?: string | null, avatar?: string | null } | null, userOrganization: { __typename?: 'UserOrganization', user: { __typename?: 'User', name?: string | null } } } | null, myBid?: { __typename?: 'MarketplaceAuctionBid', id: any, createdAt: any, marketplaceAuctionLotId: any, amount: number } | null } | { __typename?: 'MarketplaceBuyNowOutput', unitPrice: number, totalUnits: number, totalAvailableUnits: number, startDate: any, endDate: any, sortNumber: number } } | null };

export type CollectionItemBySlugQueryVariables = Exact<{
  marketplaceID: Scalars['UUID1'];
  collectionSlug: Scalars['String'];
  filter: BidFilterInput;
}>;


export type CollectionItemBySlugQuery = { __typename?: 'Query', collectionBySlug?: { __typename?: 'MarketplaceCollection', id: any, items?: Array<{ __typename?: 'MarketplaceCollectionItem', id: any, slug: string, name: string, details: { __typename?: 'MarketplaceAuctionLot', id: any, startingBid?: number | null, marketplaceCollectionItemId: any, startDate: any, endDate: any, status: AuctionLotStatus, feeStructure: { __typename?: 'MarketplaceAuctionFeeStructure', buyersPremiumRate: Array<{ __typename?: 'MarketplaceAuctionFeeStructureItem', from: number, to?: number | null, rate: number }>, overheadPremiumRate: Array<{ __typename?: 'MarketplaceAuctionFeeStructureItem', from: number, to?: number | null, rate: number }> }, bids: Array<{ __typename?: 'MarketplaceAuctionBid', id: any, createdAt: any, marketplaceAuctionLotId: any, amount: number, marketplaceUser?: { __typename?: 'MarketplaceUser', id: any, avatar?: string | null, username?: string | null } | null, userOrganization: { __typename?: 'UserOrganization', user: { __typename?: 'User', name?: string | null } } }>, currentBid?: { __typename?: 'MarketplaceAuctionBid', id: any, marketplaceAuctionLotId: any, amount: number, isCurrent: boolean, nextBidIncrement: number, createdAt: any, marketplaceUser?: { __typename?: 'MarketplaceUser', id: any, username?: string | null, avatar?: string | null } | null, userOrganization: { __typename?: 'UserOrganization', user: { __typename?: 'User', name?: string | null } } } | null, myBid?: { __typename?: 'MarketplaceAuctionBid', id: any, createdAt: any, marketplaceAuctionLotId: any, amount: number } | null } | { __typename?: 'MarketplaceBuyNowOutput', unitPrice: number, totalUnits: number, totalAvailableUnits: number, startDate: any, endDate: any, sortNumber: number } }> | null } | null };

export type GetMarketplaceQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetMarketplaceQuery = { __typename?: 'Query', marketplace: { __typename?: 'Marketplace', id: any, name: string, collections?: Array<{ __typename?: 'MarketplaceCollection', id: any, items?: Array<{ __typename?: 'MarketplaceCollectionItem', id: any, name: string, slug: string, details: { __typename?: 'MarketplaceAuctionLot', id: any } | { __typename?: 'MarketplaceBuyNowOutput' } }> | null }> | null } };

export type GetMyUserOrgsQueryVariables = Exact<{
  filter?: InputMaybe<UserOrgFilter>;
}>;


export type GetMyUserOrgsQuery = { __typename?: 'Query', serverTime: any, me?: { __typename?: 'CurrentUser', id: any, userOrgs: Array<{ __typename?: 'UserOrganization', id: any, role: string, kycStatus: KycStatus, bidAllowed: boolean, avatar?: string | null, username?: string | null, settings?: string | null }> } | null };

export type CollectionItemDataFragment = { __typename?: 'MarketplaceCollectionItem', id: any, slug: string, name: string, details: { __typename?: 'MarketplaceAuctionLot', marketplaceCollectionItemId: any, startDate: any, endDate: any, status: AuctionLotStatus, feeStructure: { __typename?: 'MarketplaceAuctionFeeStructure', buyersPremiumRate: Array<{ __typename?: 'MarketplaceAuctionFeeStructureItem', from: number, to?: number | null, rate: number }>, overheadPremiumRate: Array<{ __typename?: 'MarketplaceAuctionFeeStructureItem', from: number, to?: number | null, rate: number }> }, currentBid?: { __typename?: 'MarketplaceAuctionBid', id: any, marketplaceAuctionLotId: any, amount: number, isCurrent: boolean, nextBidIncrement: number, createdAt: any, marketplaceUser?: { __typename?: 'MarketplaceUser', id: any, username?: string | null, avatar?: string | null } | null, userOrganization: { __typename?: 'UserOrganization', user: { __typename?: 'User', name?: string | null } } } | null, myBid?: { __typename?: 'MarketplaceAuctionBid', id: any, createdAt: any, marketplaceAuctionLotId: any, amount: number } | null } | { __typename?: 'MarketplaceBuyNowOutput', unitPrice: number, totalUnits: number, totalAvailableUnits: number, startDate: any, endDate: any, sortNumber: number } };

export type CollectionItemDataAllFragment = { __typename?: 'MarketplaceCollectionItem', id: any, slug: string, name: string, details: { __typename?: 'MarketplaceAuctionLot', id: any, startingBid?: number | null, marketplaceCollectionItemId: any, startDate: any, endDate: any, status: AuctionLotStatus, feeStructure: { __typename?: 'MarketplaceAuctionFeeStructure', buyersPremiumRate: Array<{ __typename?: 'MarketplaceAuctionFeeStructureItem', from: number, to?: number | null, rate: number }>, overheadPremiumRate: Array<{ __typename?: 'MarketplaceAuctionFeeStructureItem', from: number, to?: number | null, rate: number }> }, bids: Array<{ __typename?: 'MarketplaceAuctionBid', id: any, createdAt: any, marketplaceAuctionLotId: any, amount: number, marketplaceUser?: { __typename?: 'MarketplaceUser', id: any, avatar?: string | null, username?: string | null } | null, userOrganization: { __typename?: 'UserOrganization', user: { __typename?: 'User', name?: string | null } } }>, currentBid?: { __typename?: 'MarketplaceAuctionBid', id: any, marketplaceAuctionLotId: any, amount: number, isCurrent: boolean, nextBidIncrement: number, createdAt: any, marketplaceUser?: { __typename?: 'MarketplaceUser', id: any, username?: string | null, avatar?: string | null } | null, userOrganization: { __typename?: 'UserOrganization', user: { __typename?: 'User', name?: string | null } } } | null, myBid?: { __typename?: 'MarketplaceAuctionBid', id: any, createdAt: any, marketplaceAuctionLotId: any, amount: number } | null } | { __typename?: 'MarketplaceBuyNowOutput', unitPrice: number, totalUnits: number, totalAvailableUnits: number, startDate: any, endDate: any, sortNumber: number } };

export type ProfileQueryVariables = Exact<{
  organizationID: Scalars['UUID'];
  filter?: InputMaybe<UserOrgFilter>;
}>;


export type ProfileQuery = { __typename?: 'Query', serverTime: any, me?: { __typename?: 'CurrentUser', id: any, activeBids: Array<{ __typename?: 'MarketplaceAuctionBid', id: any, amount: number, marketplaceAuctionLot: { __typename?: 'MarketplaceAuctionLot', id: any, status: AuctionLotStatus, currentBid?: { __typename?: 'MarketplaceAuctionBid', amount: number, id: any } | null, bids: Array<{ __typename?: 'MarketplaceAuctionBid', amount: number }> } }>, user: { __typename?: 'User', id: any, username: string, email?: string | null }, userOrgs: Array<{ __typename?: 'UserOrganization', id: any, organizationId: any, role: string, bidAllowed: boolean, kycStatus: KycStatus, avatar?: string | null, username?: string | null, settings?: string | null }>, favoriteItems?: Array<{ __typename?: 'MarketplaceCollectionItem', id: any }> | null } | null };

export type ServerTimeQueryVariables = Exact<{ [key: string]: never; }>;


export type ServerTimeQuery = { __typename?: 'Query', serverTime: any };

export type GetUserActiveBidsQueryVariables = Exact<{
  organizationID: Scalars['UUID'];
}>;


export type GetUserActiveBidsQuery = { __typename?: 'Query', serverTime: any, me?: { __typename?: 'CurrentUser', id: any, activeBids: Array<{ __typename?: 'MarketplaceAuctionBid', id: any, amount: number, marketplaceAuctionLot: { __typename?: 'MarketplaceAuctionLot', id: any, status: AuctionLotStatus, currentBid?: { __typename?: 'MarketplaceAuctionBid', amount: number, id: any } | null, bids: Array<{ __typename?: 'MarketplaceAuctionBid', amount: number }> } }> } | null };

export const CollectionItemDataFragmentDoc = gql`
    fragment CollectionItemData on MarketplaceCollectionItem {
  id
  slug
  name
  details {
    ... on MarketplaceBuyNowOutput {
      unitPrice
      totalUnits
      totalAvailableUnits
      startDate
      endDate
      sortNumber
    }
    ... on MarketplaceAuctionLot {
      feeStructure {
        buyersPremiumRate {
          from
          to
          rate
        }
        overheadPremiumRate {
          from
          to
          rate
        }
      }
      marketplaceCollectionItemId
      startDate
      endDate
      status
      currentBid {
        id
        marketplaceAuctionLotId
        marketplaceUser {
          id
          username
          avatar
        }
        userOrganization {
          user {
            name
          }
        }
        amount
        isCurrent
        nextBidIncrement
        createdAt
      }
      myBid {
        id
        createdAt
        marketplaceAuctionLotId
        amount
      }
    }
  }
}
    `;
export const CollectionItemDataAllFragmentDoc = gql`
    fragment CollectionItemDataAll on MarketplaceCollectionItem {
  id
  slug
  name
  details {
    ... on MarketplaceBuyNowOutput {
      unitPrice
      totalUnits
      totalAvailableUnits
      startDate
      endDate
      sortNumber
    }
    ... on MarketplaceAuctionLot {
      id
      startingBid
      feeStructure {
        buyersPremiumRate {
          from
          to
          rate
        }
        overheadPremiumRate {
          from
          to
          rate
        }
      }
      marketplaceCollectionItemId
      startDate
      endDate
      status
      bids(filter: $filter) {
        id
        createdAt
        marketplaceUser {
          id
          avatar
          username
        }
        marketplaceAuctionLotId
        marketplaceUser {
          id
          username
          avatar
        }
        amount
        userOrganization {
          user {
            name
          }
        }
      }
      currentBid {
        id
        marketplaceAuctionLotId
        marketplaceUser {
          id
          username
          avatar
        }
        userOrganization {
          user {
            name
          }
        }
        amount
        isCurrent
        nextBidIncrement
        createdAt
      }
      myBid {
        id
        createdAt
        marketplaceAuctionLotId
        amount
      }
    }
  }
}
    `;
export const PlaceBidDocument = gql`
    mutation PlaceBid($marketplaceAuctionLotId: UUID!, $amount: Float!) {
  createMarketplaceAuctionBid(
    marketplaceAuctionBid: {marketplaceAuctionLotId: $marketplaceAuctionLotId, amount: $amount}
  ) {
    id
    amount
    marketplaceAuctionLotId
    userId
  }
}
    `;
export type PlaceBidMutationFn = Apollo.MutationFunction<PlaceBidMutation, PlaceBidMutationVariables>;

/**
 * __usePlaceBidMutation__
 *
 * To run a mutation, you first call `usePlaceBidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePlaceBidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [placeBidMutation, { data, loading, error }] = usePlaceBidMutation({
 *   variables: {
 *      marketplaceAuctionLotId: // value for 'marketplaceAuctionLotId'
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function usePlaceBidMutation(baseOptions?: Apollo.MutationHookOptions<PlaceBidMutation, PlaceBidMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PlaceBidMutation, PlaceBidMutationVariables>(PlaceBidDocument, options);
      }
export type PlaceBidMutationHookResult = ReturnType<typeof usePlaceBidMutation>;
export type PlaceBidMutationResult = Apollo.MutationResult<PlaceBidMutation>;
export type PlaceBidMutationOptions = Apollo.BaseMutationOptions<PlaceBidMutation, PlaceBidMutationVariables>;
export const RemoveFromUserFavoritesDocument = gql`
    mutation RemoveFromUserFavorites($collectionItemId: UUID1!) {
  deleteCollectionItemFromUserFavorites(collectionItemId: $collectionItemId)
}
    `;
export type RemoveFromUserFavoritesMutationFn = Apollo.MutationFunction<RemoveFromUserFavoritesMutation, RemoveFromUserFavoritesMutationVariables>;

/**
 * __useRemoveFromUserFavoritesMutation__
 *
 * To run a mutation, you first call `useRemoveFromUserFavoritesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromUserFavoritesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromUserFavoritesMutation, { data, loading, error }] = useRemoveFromUserFavoritesMutation({
 *   variables: {
 *      collectionItemId: // value for 'collectionItemId'
 *   },
 * });
 */
export function useRemoveFromUserFavoritesMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFromUserFavoritesMutation, RemoveFromUserFavoritesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFromUserFavoritesMutation, RemoveFromUserFavoritesMutationVariables>(RemoveFromUserFavoritesDocument, options);
      }
export type RemoveFromUserFavoritesMutationHookResult = ReturnType<typeof useRemoveFromUserFavoritesMutation>;
export type RemoveFromUserFavoritesMutationResult = Apollo.MutationResult<RemoveFromUserFavoritesMutation>;
export type RemoveFromUserFavoritesMutationOptions = Apollo.BaseMutationOptions<RemoveFromUserFavoritesMutation, RemoveFromUserFavoritesMutationVariables>;
export const SaveToFavoritesDocument = gql`
    mutation SaveToFavorites($collectionItemId: UUID1!) {
  addCollectionItemToUserFavorites(collectionItemId: $collectionItemId)
}
    `;
export type SaveToFavoritesMutationFn = Apollo.MutationFunction<SaveToFavoritesMutation, SaveToFavoritesMutationVariables>;

/**
 * __useSaveToFavoritesMutation__
 *
 * To run a mutation, you first call `useSaveToFavoritesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveToFavoritesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveToFavoritesMutation, { data, loading, error }] = useSaveToFavoritesMutation({
 *   variables: {
 *      collectionItemId: // value for 'collectionItemId'
 *   },
 * });
 */
export function useSaveToFavoritesMutation(baseOptions?: Apollo.MutationHookOptions<SaveToFavoritesMutation, SaveToFavoritesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveToFavoritesMutation, SaveToFavoritesMutationVariables>(SaveToFavoritesDocument, options);
      }
export type SaveToFavoritesMutationHookResult = ReturnType<typeof useSaveToFavoritesMutation>;
export type SaveToFavoritesMutationResult = Apollo.MutationResult<SaveToFavoritesMutation>;
export type SaveToFavoritesMutationOptions = Apollo.BaseMutationOptions<SaveToFavoritesMutation, SaveToFavoritesMutationVariables>;
export const UpdateUserOrgSettingsDocument = gql`
    mutation UpdateUserOrgSettings($userOrgId: String!, $username: String, $avatar: String, $settingsJson: String) {
  updateUserOrgSettings(
    params: {userOrgId: $userOrgId, username: $username, avatar: $avatar, settingsJson: $settingsJson}
  ) {
    id
  }
}
    `;
export type UpdateUserOrgSettingsMutationFn = Apollo.MutationFunction<UpdateUserOrgSettingsMutation, UpdateUserOrgSettingsMutationVariables>;

/**
 * __useUpdateUserOrgSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateUserOrgSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserOrgSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserOrgSettingsMutation, { data, loading, error }] = useUpdateUserOrgSettingsMutation({
 *   variables: {
 *      userOrgId: // value for 'userOrgId'
 *      username: // value for 'username'
 *      avatar: // value for 'avatar'
 *      settingsJson: // value for 'settingsJson'
 *   },
 * });
 */
export function useUpdateUserOrgSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserOrgSettingsMutation, UpdateUserOrgSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserOrgSettingsMutation, UpdateUserOrgSettingsMutationVariables>(UpdateUserOrgSettingsDocument, options);
      }
export type UpdateUserOrgSettingsMutationHookResult = ReturnType<typeof useUpdateUserOrgSettingsMutation>;
export type UpdateUserOrgSettingsMutationResult = Apollo.MutationResult<UpdateUserOrgSettingsMutation>;
export type UpdateUserOrgSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateUserOrgSettingsMutation, UpdateUserOrgSettingsMutationVariables>;
export const CheckUsernameDocument = gql`
    query CheckUsername($organizationID: UUID1!, $username: String!) {
  orgUsernameAvailable(organizationID: $organizationID, username: $username)
}
    `;

/**
 * __useCheckUsernameQuery__
 *
 * To run a query within a React component, call `useCheckUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckUsernameQuery({
 *   variables: {
 *      organizationID: // value for 'organizationID'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCheckUsernameQuery(baseOptions: Apollo.QueryHookOptions<CheckUsernameQuery, CheckUsernameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckUsernameQuery, CheckUsernameQueryVariables>(CheckUsernameDocument, options);
      }
export function useCheckUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckUsernameQuery, CheckUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckUsernameQuery, CheckUsernameQueryVariables>(CheckUsernameDocument, options);
        }
export type CheckUsernameQueryHookResult = ReturnType<typeof useCheckUsernameQuery>;
export type CheckUsernameLazyQueryHookResult = ReturnType<typeof useCheckUsernameLazyQuery>;
export type CheckUsernameQueryResult = Apollo.QueryResult<CheckUsernameQuery, CheckUsernameQueryVariables>;
export const CollectionBySlugDocument = gql`
    query CollectionBySlug($slug: String!, $marketplaceID: UUID1!) {
  collectionBySlug(slug: $slug, marketplaceID: $marketplaceID) {
    id
    items {
      ...CollectionItemData
    }
  }
}
    ${CollectionItemDataFragmentDoc}`;

/**
 * __useCollectionBySlugQuery__
 *
 * To run a query within a React component, call `useCollectionBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      marketplaceID: // value for 'marketplaceID'
 *   },
 * });
 */
export function useCollectionBySlugQuery(baseOptions: Apollo.QueryHookOptions<CollectionBySlugQuery, CollectionBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollectionBySlugQuery, CollectionBySlugQueryVariables>(CollectionBySlugDocument, options);
      }
export function useCollectionBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollectionBySlugQuery, CollectionBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollectionBySlugQuery, CollectionBySlugQueryVariables>(CollectionBySlugDocument, options);
        }
export type CollectionBySlugQueryHookResult = ReturnType<typeof useCollectionBySlugQuery>;
export type CollectionBySlugLazyQueryHookResult = ReturnType<typeof useCollectionBySlugLazyQuery>;
export type CollectionBySlugQueryResult = Apollo.QueryResult<CollectionBySlugQuery, CollectionBySlugQueryVariables>;
export const CollectionItemDocument = gql`
    query CollectionItem($id: UUID1!, $filter: BidFilterInput!) {
  collectionItemById(id: $id) {
    ...CollectionItemData
    details {
      ... on MarketplaceAuctionLot {
        bids(filter: $filter) {
          id
          createdAt
          marketplaceUser {
            id
            avatar
            username
          }
          marketplaceAuctionLotId
          marketplaceUser {
            id
            username
            avatar
          }
          amount
          userOrganization {
            user {
              name
            }
          }
        }
      }
    }
  }
}
    ${CollectionItemDataFragmentDoc}`;

/**
 * __useCollectionItemQuery__
 *
 * To run a query within a React component, call `useCollectionItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionItemQuery({
 *   variables: {
 *      id: // value for 'id'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCollectionItemQuery(baseOptions: Apollo.QueryHookOptions<CollectionItemQuery, CollectionItemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollectionItemQuery, CollectionItemQueryVariables>(CollectionItemDocument, options);
      }
export function useCollectionItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollectionItemQuery, CollectionItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollectionItemQuery, CollectionItemQueryVariables>(CollectionItemDocument, options);
        }
export type CollectionItemQueryHookResult = ReturnType<typeof useCollectionItemQuery>;
export type CollectionItemLazyQueryHookResult = ReturnType<typeof useCollectionItemLazyQuery>;
export type CollectionItemQueryResult = Apollo.QueryResult<CollectionItemQuery, CollectionItemQueryVariables>;
export const CollectionItemBySlugDocument = gql`
    query CollectionItemBySlug($marketplaceID: UUID1!, $collectionSlug: String!, $filter: BidFilterInput!) {
  collectionBySlug(slug: $collectionSlug, marketplaceID: $marketplaceID) {
    id
    items {
      ...CollectionItemDataAll
    }
  }
}
    ${CollectionItemDataAllFragmentDoc}`;

/**
 * __useCollectionItemBySlugQuery__
 *
 * To run a query within a React component, call `useCollectionItemBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionItemBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionItemBySlugQuery({
 *   variables: {
 *      marketplaceID: // value for 'marketplaceID'
 *      collectionSlug: // value for 'collectionSlug'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCollectionItemBySlugQuery(baseOptions: Apollo.QueryHookOptions<CollectionItemBySlugQuery, CollectionItemBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollectionItemBySlugQuery, CollectionItemBySlugQueryVariables>(CollectionItemBySlugDocument, options);
      }
export function useCollectionItemBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollectionItemBySlugQuery, CollectionItemBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollectionItemBySlugQuery, CollectionItemBySlugQueryVariables>(CollectionItemBySlugDocument, options);
        }
export type CollectionItemBySlugQueryHookResult = ReturnType<typeof useCollectionItemBySlugQuery>;
export type CollectionItemBySlugLazyQueryHookResult = ReturnType<typeof useCollectionItemBySlugLazyQuery>;
export type CollectionItemBySlugQueryResult = Apollo.QueryResult<CollectionItemBySlugQuery, CollectionItemBySlugQueryVariables>;
export const GetMarketplaceDocument = gql`
    query GetMarketplace($id: UUID!) {
  marketplace(id: $id) {
    id
    name
    collections {
      id
      items {
        id
        name
        slug
        details {
          ... on MarketplaceAuctionLot {
            id
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetMarketplaceQuery__
 *
 * To run a query within a React component, call `useGetMarketplaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMarketplaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMarketplaceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMarketplaceQuery(baseOptions: Apollo.QueryHookOptions<GetMarketplaceQuery, GetMarketplaceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMarketplaceQuery, GetMarketplaceQueryVariables>(GetMarketplaceDocument, options);
      }
export function useGetMarketplaceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMarketplaceQuery, GetMarketplaceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMarketplaceQuery, GetMarketplaceQueryVariables>(GetMarketplaceDocument, options);
        }
export type GetMarketplaceQueryHookResult = ReturnType<typeof useGetMarketplaceQuery>;
export type GetMarketplaceLazyQueryHookResult = ReturnType<typeof useGetMarketplaceLazyQuery>;
export type GetMarketplaceQueryResult = Apollo.QueryResult<GetMarketplaceQuery, GetMarketplaceQueryVariables>;
export const GetMyUserOrgsDocument = gql`
    query GetMyUserOrgs($filter: UserOrgFilter) {
  serverTime
  me {
    id
    userOrgs(filter: $filter) {
      id
      role
      kycStatus
      bidAllowed
      avatar
      username
      settings
    }
  }
}
    `;

/**
 * __useGetMyUserOrgsQuery__
 *
 * To run a query within a React component, call `useGetMyUserOrgsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyUserOrgsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyUserOrgsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetMyUserOrgsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyUserOrgsQuery, GetMyUserOrgsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyUserOrgsQuery, GetMyUserOrgsQueryVariables>(GetMyUserOrgsDocument, options);
      }
export function useGetMyUserOrgsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyUserOrgsQuery, GetMyUserOrgsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyUserOrgsQuery, GetMyUserOrgsQueryVariables>(GetMyUserOrgsDocument, options);
        }
export type GetMyUserOrgsQueryHookResult = ReturnType<typeof useGetMyUserOrgsQuery>;
export type GetMyUserOrgsLazyQueryHookResult = ReturnType<typeof useGetMyUserOrgsLazyQuery>;
export type GetMyUserOrgsQueryResult = Apollo.QueryResult<GetMyUserOrgsQuery, GetMyUserOrgsQueryVariables>;
export const ProfileDocument = gql`
    query Profile($organizationID: UUID!, $filter: UserOrgFilter) {
  serverTime
  me {
    id
    activeBids(orgId: $organizationID) {
      id
      amount
      marketplaceAuctionLot {
        id
        status
        currentBid {
          amount
          id
        }
        bids {
          amount
        }
      }
    }
    user {
      id
      username
      email
    }
    userOrgs(filter: $filter) {
      id
      organizationId
      role
      bidAllowed
      kycStatus
      avatar
      username
      settings
    }
    favoriteItems {
      id
    }
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *      organizationID: // value for 'organizationID'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useProfileQuery(baseOptions: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const ServerTimeDocument = gql`
    query ServerTime {
  serverTime
}
    `;

/**
 * __useServerTimeQuery__
 *
 * To run a query within a React component, call `useServerTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useServerTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServerTimeQuery({
 *   variables: {
 *   },
 * });
 */
export function useServerTimeQuery(baseOptions?: Apollo.QueryHookOptions<ServerTimeQuery, ServerTimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServerTimeQuery, ServerTimeQueryVariables>(ServerTimeDocument, options);
      }
export function useServerTimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServerTimeQuery, ServerTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServerTimeQuery, ServerTimeQueryVariables>(ServerTimeDocument, options);
        }
export type ServerTimeQueryHookResult = ReturnType<typeof useServerTimeQuery>;
export type ServerTimeLazyQueryHookResult = ReturnType<typeof useServerTimeLazyQuery>;
export type ServerTimeQueryResult = Apollo.QueryResult<ServerTimeQuery, ServerTimeQueryVariables>;
export const GetUserActiveBidsDocument = gql`
    query GetUserActiveBids($organizationID: UUID!) {
  serverTime
  me {
    id
    activeBids(orgId: $organizationID) {
      id
      amount
      marketplaceAuctionLot {
        id
        status
        currentBid {
          amount
          id
        }
        bids {
          amount
        }
      }
    }
  }
}
    `;

/**
 * __useGetUserActiveBidsQuery__
 *
 * To run a query within a React component, call `useGetUserActiveBidsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserActiveBidsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserActiveBidsQuery({
 *   variables: {
 *      organizationID: // value for 'organizationID'
 *   },
 * });
 */
export function useGetUserActiveBidsQuery(baseOptions: Apollo.QueryHookOptions<GetUserActiveBidsQuery, GetUserActiveBidsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserActiveBidsQuery, GetUserActiveBidsQueryVariables>(GetUserActiveBidsDocument, options);
      }
export function useGetUserActiveBidsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserActiveBidsQuery, GetUserActiveBidsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserActiveBidsQuery, GetUserActiveBidsQueryVariables>(GetUserActiveBidsDocument, options);
        }
export type GetUserActiveBidsQueryHookResult = ReturnType<typeof useGetUserActiveBidsQuery>;
export type GetUserActiveBidsLazyQueryHookResult = ReturnType<typeof useGetUserActiveBidsLazyQuery>;
export type GetUserActiveBidsQueryResult = Apollo.QueryResult<GetUserActiveBidsQuery, GetUserActiveBidsQueryVariables>;