import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../slices/counterSlice";

export default function Increment() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>Increment state</button>
    </div>
  );
}
