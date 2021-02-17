import { useEffect, useState } from "react";
import Axios from "../api-client/axios";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const SideMenu = ({ sections, setSections, onSelect }) => {
  const getSection = async () => {
    try {
      const result = await Axios.get("section-list.json");

      setSections(result.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSection();
  }, []);

  return (
    <div>
      <List component="nav" aria-label="main mailbox folders">
        {sections.map((item, index) => (
          <>
            <ListItem onClick={() => onSelect(item.section)} button>
              <ListItemText primary={item.display_name} />
            </ListItem>
          </>
        ))}
      </List>
    </div>
  );
};

export default SideMenu;
