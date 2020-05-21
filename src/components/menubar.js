import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuListComposition() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <Link to="/">
        <Button style={{ color: "whitesmoke" }}>Home</Button>
      </Link>
      <span>
        <Button
          style={{ color: "whitesmoke" }}
          ref={anchorRef}
          aria-controls={open ? "aboutus-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          About Us
          <ExpandMoreIcon />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper style={{ backgroundColor: "#029371" }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="aboutus-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <Link style={{ color: "whitesmoke" }} to="/aboutus">
                      <MenuItem onClick={handleClose}>
                        Citizens Bank - About Us
                      </MenuItem>
                    </Link>
                    <Link style={{ color: "whitesmoke" }} to="/alliancestory">
                      <MenuItem onClick={handleClose}>Alliance Story</MenuItem>
                    </Link>
                    <Link style={{ color: "whitesmoke" }} to="/whoswho">
                      <MenuItem onClick={handleClose}>Who's Who</MenuItem>
                    </Link>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </span>
      <span>
        <Button
          style={{ color: "whitesmoke" }}
          ref={anchorRef}
          aria-controls={open ? "opportunities-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Opportunities
          <ExpandMoreIcon />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper style={{ backgroundColor: "#029371" }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="opportunities-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <Link style={{ color: "whitesmoke" }} to="/presales">
                      <MenuItem onClick={handleClose}>
                        Presales & Proposals
                      </MenuItem>
                    </Link>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </span>
    </div>
  );
}
