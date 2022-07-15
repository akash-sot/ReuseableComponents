import { Input, Radio } from "antd";
import { useEffect, useState } from "react";
import * as styles from "./ReportTypeRadioStyles";

const radioItems = [
  {
    id: 1,
    title: "7 day SUSAR",
    value: 7,
    name: "radio1",
  },
  {
    id: 2,
    title: "15 day SUSAR",
    value: 15,
    name: "radio2",
  },
  {
    id: 3,
    title: "Others Reports",
    value: 100,
    name: "radio2",
  },
];

function ReportTypeRadio(props: {
  setRadioValue: Function;
  radioInputValue?: string;
  setRadioInputValue?: Function;
  selected?: number | undefined;
}) {
  const [radioId, setRadioId] = useState<number | string>(1);
  const { setRadioValue, radioInputValue, setRadioInputValue, selected } =
    props;

  useEffect(() => {
    if (selected !== undefined) {
      const selectedRadioItem = radioItems.find(
        (item) => item.value === selected
      );
      selectedRadioItem ? setRadioId(selectedRadioItem.id) : setRadioId(1);
    }
  }, []);

  function handleRadioBtnClick(id: number, value: any) {
    setRadioId(id);
    setRadioValue(value);
  }
  return (
    <styles.Container>
      <Radio.Group value={radioId}>
        {radioItems.map((item, idx) => (
          <Radio
            name={item.name}
            onClick={() => handleRadioBtnClick(item.id, item.value)}
            value={item.id}
            key={idx}
          >
            {item.title}
          </Radio>
        ))}
      </Radio.Group>
      {3 === radioId && (
        <Input
          size="small"
          style={{ width: "20%" }}
          value={radioInputValue}
          onChange={(e) =>
            setRadioInputValue && setRadioInputValue(e.target.value)
          }
        />
      )}
    </styles.Container>
  );
}

export default ReportTypeRadio;
