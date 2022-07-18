import * as styles from "./SideMenuStyles.js";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import roleMenu from "../../../Configs/SideMenuItems";
import { Link } from "react-router-dom";
import { auth } from "../../../CommonMethods/API/Auth";
import { useSelector, useDispatch } from "react-redux";
import { setActive } from "../../../redux/MenuActive.js";
import { useNavigate } from "react-router-dom";

function SideMenu() {
  const navigate = useNavigate();
  const role = auth.getCurrentRole();
  const menuItems = roleMenu[role] || [];
  const dispatch = useDispatch();
  const menuActiveItem = useSelector((state) => state.menuActiveReducer);
  function handlemenuActiveChange(item) {
    dispatch(setActive(item.key));
    if (item.key === "logout") {
      auth.logout();
      navigate("/");
    }
  }
  return (
    <styles.Container>
      <Menu
        className="sidebar-wrapper"
        selectedKeys={[
          typeof menuActiveItem !== "string" ? "1" : menuActiveItem,
        ]}
        mode="inline"
        onClick={(item) => handlemenuActiveChange(item)}
      >
        {menuItems.map((item) => {
          if (item.subItems)
            return (
              <SubMenu key={item.key} icon={item.Icon} title={item.title}>
                {item.subItems.map((subItem) => (
                  <Menu.Item key={subItem.key}>
                    <Link to={subItem.url || ""}>{subItem.title}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          else
            return (
              <Menu.Item key={item.key} icon={item.Icon}>
                <Link to={item.url || ""}>{item.title}</Link>
              </Menu.Item>
            );
        })}
      </Menu>
      <styles.MenuFooter>
        <h5>
          Product by <span>Soterius</span>
        </h5>
        <h5>Version 1.0.0</h5>
        <styles.FooterLinks>
          <a
            href="https://soterius.com/privacy-policy"
            rel="noreferrer"
            target="_blank"
          >
            <h5>Terms & Conditions</h5>
          </a>
          <span style={{ margin: "0 5px" }}>|</span>
          <a
            href="https://soterius.com/terms-conditions"
            rel="noreferrer"
            target="_blank"
          >
            <h5>Privacy Policy</h5>
          </a>
        </styles.FooterLinks>
      </styles.MenuFooter>
    </styles.Container>
  );
}

export default SideMenu;
