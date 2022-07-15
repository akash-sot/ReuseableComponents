import * as styles from "./PathIndicatorStyles";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

function PathIndicator(props: { items: any[] }) {
  return (
    <styles.Container>
      <Breadcrumb>
        {props.items.map((ele, idx) => (
          <Breadcrumb.Item key={idx}>
            {window.location.pathname === ele.title ? (
              ele.title
            ) : (
              <Link key={idx} to={ele.url}>{ele.title}</Link>
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </styles.Container>
  );
}

export default PathIndicator;
