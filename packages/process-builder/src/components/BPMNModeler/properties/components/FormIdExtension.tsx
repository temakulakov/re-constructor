import { useProcessStore } from '~model';
import classes from './FormId.module.css';

type FormIdExtensionProps = {
  id: string;
};

export const FormIdExtension = ({ id }: FormIdExtensionProps) => {
  const { routeController } = useProcessStore();

  const handleClick = () => {
    routeController?.navigate(`/forms/${id}`);
  };

  return (
    id && (
      <div className={classes.block}>
        <button className={classes.button} type="button" onClick={handleClick}>
          show form
        </button>
      </div>
    )
  );
};
