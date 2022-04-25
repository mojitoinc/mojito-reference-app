import { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useRouter } from "next/router";
import ConnectContext from "../../utils/ConnectContext";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";

const StyledDropdown = styled.div`
  display: block;
  position: relative;
  height: 100%;
  overflow: hidden;
`;

const StyledMenu = withStyles({
  paper: {
    borderRadius: 0,
    backgroundColor: "#181818",
    color: "#fff",
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    color: "#fff",
  },
}))(MenuItem);

const useStyles = makeStyles({
  button: {
    background: "linear-gradient(to right, #eebc0f 0%, #18e2ac 100%)",
    position: "relative",
    fontFamily: "Sequel 100 Wide",
  },
  menuItem: {
    color: "#fff",
    "&:hover": {
      background: "#ccc",
    },
  },
});

const DropdownMenu: React.FC<{ address: string }> = ({ address }) => {
  const classes = useStyles();
  const { connect, setConnect } = useContext(ConnectContext);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const disconnectWeb3 = async () => {
    connect.modal?.clearCachedProvider();
    setConnect({
      account: null,
      signer: null,
      provider: null,
      connected: false,
      chainId: parseInt(process.env.NEXT_PUBLIC_CHAINID),
    });
  };

  return (
    <StyledDropdown>
      <Button
        aria-controls="customized-menu"
        variant="contained"
        color="default"
        onClick={handleClick}
        className={classes.button}
      >
        {address} {"  "} <ExpandMoreIcon />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        autoFocus={false}
      >
        <StyledMenuItem
          onClick={() => router.push("/collection")}
          className={classes.menuItem}
        >
          <ListItemIcon className={classes.menuItem}>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="My Collection" />
        </StyledMenuItem>

        <StyledMenuItem onClick={disconnectWeb3} className={classes.menuItem}>
          <ListItemIcon className={classes.menuItem}>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Disconnect" />
        </StyledMenuItem>
      </StyledMenu>
    </StyledDropdown>
  );
};

export default DropdownMenu;
