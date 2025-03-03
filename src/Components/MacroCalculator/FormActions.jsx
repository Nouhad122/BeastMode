import React from 'react';
import { VscDebugStart } from "react-icons/vsc";
import Button from '../sharedComps/Button';
import classes from './FormActions.module.css';

const FormActions = ({ onClear }) => {
  return (
    <div className={classes.formBtnsWrapper}>
      <Button type="submit" className={classes.submitBtn}>
        Calculate <VscDebugStart />
      </Button>
      <Button type="button" className={classes.clearBtn} onClick={onClear}>
        Clear
      </Button>
    </div>
  );
};

export default FormActions;