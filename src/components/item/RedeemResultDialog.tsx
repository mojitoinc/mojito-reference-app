import { useMemo, ReactNode } from "react";

import { strings } from "@constants";
import { AlertDialog } from "../shared/AlertDialog";
import Link from "next/link";

export interface RedeemResultDialogProps {
  type?: "success" | "error" | "required";
  walletLink: string;
  onClose: () => void;
}

export const RedeemResultDialog: React.FC<RedeemResultDialogProps> = ({
  type,
  walletLink,
  onClose,
}) => {
  const {
    title,
    message,
  }: {
    title: ReactNode;
    message: ReactNode;
  } = useMemo(() => {
    switch (type) {
      case "success":
        return {
          title: strings.REDEEM.ALERT.SUCCESS.TITLE,
          message: (
            <>
              {strings.REDEEM.ALERT.SUCCESS.MESSAGE}
              <Link href={walletLink} passHref>
                <a target="_blank" rel="noopener noreferrer">
                  {strings.REDEEM.ALERT.SUCCESS.WALLET_VISIT}
                </a>
              </Link>
            </>
          ),
        };
      case "error":
        return {
          title: strings.REDEEM.ALERT.FAIL.TITLE,
          message: strings.REDEEM.ALERT.FAIL.MESSAGE,
        };
      case "required":
        return {
          title: strings.REDEEM.ALERT.CODE_REQUIRED.TITLE,
          message: strings.REDEEM.ALERT.CODE_REQUIRED.MESSAGE,
        };
      default:
        return {
          title: "",
          message: "",
        };
    }
  }, [type, walletLink]);

  return (
    <AlertDialog
      open={type !== undefined}
      title={title}
      message={message}
      onClose={onClose}
    />
  );
};
