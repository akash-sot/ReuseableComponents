import * as styles from "./DisplayMsgStyles";

function DisplayMsg(props: { message: string }) {
  return (
    <styles.Container>
      <h3>{props.message}</h3>
    </styles.Container>
  );
}

export default DisplayMsg;
