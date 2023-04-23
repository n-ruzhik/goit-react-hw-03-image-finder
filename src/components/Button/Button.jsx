import Loader from 'components/Loader';
import css from './Button.module.css';


export default function  Button({ handleIncrement, loading }) {
  return (
    <>
      <button type="button" className={css.loadMoreBtn} onClick={handleIncrement}>
        {loading ? <Loader /> : 'Load more'}
      </button>
    </>
  );
}

