import { BallTriangle } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader}>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#1DA1F2"
        ariaLabel="ball-triangle-loading"
        // wrapperClass={css.loader}
        wrapperStyle=""
        visible={true}
      />
    </div>
  );
}
