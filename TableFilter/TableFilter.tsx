import { Select } from "antd";
import * as styles from "./TableFilterStyles";
function TableFilter(props: { childrens: string[]; action: Function }) {
  const { Option } = Select;
  const { childrens, action } = props;

  function handleChnages(option: any) {
    action(option.children);
  }
  return (
    <styles.Container>
      <Select
        size="middle"
        defaultValue="Select"
        onChange={(value, option) => handleChnages(option)}
        style={{ width: 200 }}
      >
        {childrens.map((child, idx) => {
          return <Option key={idx}>{child}</Option>;
        })}
      </Select>
    </styles.Container>
  );
}

export default TableFilter;
